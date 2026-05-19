//Notification ///
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const twilio = require("twilio");

// Configure Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Sandbox number
const STUDENT_PHONE_NUMBER = "whatsapp:+917506979973"; // Student's phone number

console.log("🚀 Starting student notification service...");

// Function to send WhatsApp notification when attendance is marked
async function sendWhatsAppNotification(newEntryData) {
  try {
    console.log("📡 New entry detected in 'Id' table...");

    // Step 1: Fetch student's name using uid
    const { data: student, error: studentError } = await supabase
      .from("students") // Replace with your actual table name if different
      .select("name")
      .eq("uid", newEntryData.uid)
      .single();

    if (studentError) {
      console.error("⚠️ Failed to fetch student name:", studentError.message);
    }

    const studentName = student?.name || newEntryData.uid || "Unknown";

    // Step 2: Construct the WhatsApp message
    const message = `
📚 *Attendance Marked!*

🆔 *ID:* ${newEntryData.id || 'Not specified'}
👤 *Name:* ${studentName}
📅 *Timestamp:* 13:50'}

✅ *Your attendance has been successfully marked.*
    `.trim();

    console.log("📨 Sending message:", message);

    // Step 3: Send the WhatsApp message
    await twilioClient.messages.create({
      body: message,
      from: TWILIO_WHATSAPP_NUMBER,
      to: STUDENT_PHONE_NUMBER
    });

    console.log(`✅ Notification sent to student (${STUDENT_PHONE_NUMBER})`);
  } catch (error) {
    console.error("❌ Error sending notification:", error.message);
  }
}

// Function to set up real-time listener for new entries in the 'Id' table
function setupRealtimeListener() {
  const channel = supabase
    .channel("student-notification-channel")
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "Id",
    }, async (payload) => {
      console.log("🔔 New entry detected in 'Id' table!");
      await sendWhatsAppNotification(payload.new); // Trigger notification
    })
    .subscribe(status => {
      if (status === "SUBSCRIBED") {
        console.log("🔔 Real-time listener connected successfully.");
      }
    });

  return channel;
}

// Start listening
setupRealtimeListener();
console.log("👂 Listening for new student entries in the 'Id' table...");








