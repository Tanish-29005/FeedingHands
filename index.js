
// require("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");
// const twilio = require("twilio");

// // Configure Supabase
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// // Initialize Twilio client
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Sandbox number

// console.log("🚀 Starting donation notification service...");

// function formatPhoneNumber(number) {
//   const cleaned = number.replace(/\D/g, '');
//   if (!cleaned.startsWith('+') && !cleaned.startsWith('91')) {
//     return `+91${cleaned}`;
//   }
//   return `+${cleaned}`;
// }

// async function sendWhatsAppNotifications(donationData) {
//   try {
//     console.log("📡 Fetching recipient contact from donation table...");
    
//     if (!donationData.contact) {
//       console.log("⚠️ No contact number found for this donation.");
//       return;
//     }
    
//     const formattedNumber = formatPhoneNumber(donationData.contact);
    
//     const message = `
// 🌍 *Donation Successful!* 🚚

// 🍽 *Type:* ${donationData.type || 'Not specified'}
// 📍 *Location:* ${donationData.location || 'Not specified'}
// 📝 *Notes:* ${donationData.notes || 'None'}

// 🚀 *Food has been successfully Donated!*
//     `.trim();

//     console.log("Final message to be sent:", message);
//     console.log("📨 Sending notification...");
    
//     try {
//       await twilioClient.messages.create({
//         body: message,
//         from: TWILIO_WHATSAPP_NUMBER,
//         to: `whatsapp:${formattedNumber}`
//       });
//       console.log(`✅ Sent to recipient (${formattedNumber})`);
//     } catch (error) {
//       console.error(`❌ Failed to send to recipient:`, error.message);
//     }
//   } catch (error) {
//     console.error("⚠️ Notification error:", error.message);
//   }
// }

// function setupRealtimeListener() {
//   const channel = supabase
//     .channel("donation-tracker")
//     .on("postgres_changes", {
//       event: "UPDATE",
//       schema: "public",
//       table: "donation",
//     }, async (payload) => {
//       console.log("🔔 Donation update detected! Checking status...");
//       if (payload.new.status2 === "Delivered to NGO") {
//         console.log("🚀 Status is 'Delivered to NGO', sending notification...");
//         await sendWhatsAppNotifications(payload.new);
//       } else {
//         console.log("ℹ️ Status update is not 'Delivered to NGO', ignoring.");
//       }
//     })
//     .subscribe(status => {
//       if (status === "SUBSCRIBED") {
//         console.log("🔔 Successfully connected to realtime channel");
//       }
//     });

//   return channel;
// }

// setupRealtimeListener();
// console.log("👂 Listening for donation status updates...");



// ("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");
// const twilio = require("twilio");

// // Configure Supabase
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// // Initialize Twilio client
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   prequirerocess.env.TWILIO_AUTH_TOKEN
// );

// const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Sandbox number

// console.log("🚀 Starting donation notification service...");

// // Function to format phone numbers
// function formatPhoneNumber(number) {
//   const cleaned = number.replace(/\D/g, ''); // Remove non-numeric characters
//   if (!cleaned.startsWith('+') && !cleaned.startsWith('91')) {
//     return `+91${cleaned}`;
//   }
//   return `+${cleaned}`;
// }

// // Function to send WhatsApp notifications to all contacts in the donation table
// async function sendWhatsAppNotifications(donationData) {
//   try {
//     console.log("📡 Fetching all recipient contacts from donation table...");

//     // Fetch all distinct contact numbers from the donation table
//     const { data: donations, error } = await supabase
//       .from("donation")
//       .select("contact")
//       .not("contact", "is", null); // Exclude null values

//     if (error) throw new Error(`Supabase error: ${error.message}`);
//     if (!donations || donations.length === 0) {
//       console.log("ℹ️ No recipient contacts found in the donation table.");
//       return;
//     }

//     // Extract unique contacts and format them
//     const uniqueContacts = [...new Set(donations.map(d => formatPhoneNumber(d.contact)))];

//     console.log("Unique recipient contacts:", uniqueContacts);

//     // Construct the WhatsApp message
//     const message = `
// 🌍 *Donation Successful!* 🚚

// 🍽 *Type:* ${donationData.type || 'Not specified'}
// 📍 *Location:* ${donationData.location || 'Not specified'}
// 📝 *Notes:* ${donationData.notes || 'None'}
// *Food Details:* ${JSON.stringify(donationData.foodDetails, null, 2) || 'None'}


// 🚀 *Food has been successfully donated!*
//     `.trim();

//     console.log("Final message to be sent:", message);
//     console.log("📨 Sending notifications...");

//     // Send the message to each unique contact
//     for (const contact of uniqueContacts) {
//       try {
//         await twilioClient.messages.create({
//           body: message,
//           from: TWILIO_WHATSAPP_NUMBER,
//           to: `whatsapp:${contact}`
//         });
//         console.log(`✅ Sent to recipient (${contact})`);
//       } catch (error) {
//         console.error(`❌ Failed to send to ${contact}:`, error.message);
//       }
//     }
//   } catch (error) {
//     console.error("⚠️ Notification error:", error.message);
//   }
// }

// // Real-time listener for donation status updates
// function setupRealtimeListener() {
//   const channel = supabase
//     .channel("donation-tracker")
//     .on("postgres_changes", {
//       event: "UPDATE",
//       schema: "public",
//       table: "donation",
//     }, async (payload) => {
//       console.log("🔔 Donation update detected! Checking status...");
//       if (payload.new.status2 === "Delivered to NGO") {
//         console.log("🚀 Status is 'Delivered to NGO', sending notifications...");
//         await sendWhatsAppNotifications(payload.new);
//       } else {
//         console.log("ℹ️ Status update is not 'Delivered to NGO', ignoring.");
//       }
//     })
//     .subscribe(status => {
//       if (status === "SUBSCRIBED") {
//         console.log("🔔 Successfully connected to real-time channel");
//       }
//     });

//   return channel;
// }

// setupRealtimeListener();
// console.log("👂 Listening for donation status updates...");


//Deep Blue//###########
// require("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");
// const twilio = require("twilio");

// // Configure Supabase
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// // Initialize Twilio client
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Sandbox number

// console.log("🚀 Starting donation notification service...");

// // Function to format phone numbers
// function formatPhoneNumber(number) {
//   const cleaned = number.replace(/\D/g, ''); // Remove non-numeric characters
//   if (!cleaned.startsWith('+') && !cleaned.startsWith('91')) {
//     return `+91${cleaned}`;
//   }
//   return `+${cleaned}`;
// }

// // Function to send WhatsApp notifications to all contacts in the donation table
// async function sendWhatsAppNotifications(donationData) {
//   try {
//     console.log("📡 Fetching all recipient contacts from donation table...");

//     // Fetch all distinct contact numbers from the donation table
//     const { data: donations, error } = await supabase
//       .from("donation")
//       .select("contact")
//       .not("contact", "is", null); // Exclude null values

//     if (error) throw new Error(`Supabase error: ${error.message}`);
//     if (!donations || donations.length === 0) {
//       console.log("ℹ️ No recipient contacts found in the donation table.");
//       return;
//     }

//     // Extract unique contacts and format them
//     const uniqueContacts = [...new Set(donations.map(d => formatPhoneNumber(d.contact)))];

//     console.log("Unique recipient contacts:", uniqueContacts);

//     // Format food details properly
//     const foodDetailsFormatted = Array.isArray(donationData.foodDetails)
//       ? donationData.foodDetails
//           .map(item => Object.entries(item)
//             .map(([key, value]) => `🔹 *${key}:* ${value}`)
//             .join("\n")
//           ).join("\n")
//       : "None";

//     // Construct the WhatsApp message
//     const message = `
// 🌍 *Donation Delivered!* 🚚

// 🍽 *Type:* ${donationData.type || 'Not specified'}
// 📍 *Location:* ${donationData.location || 'Not specified'}
// 📝 *Notes:* ${donationData.notes || 'None'}

// 🍛 *Food Details:*
// ${foodDetailsFormatted}

// 🚀 *Food has been successfully delivered!*
//     `.trim();

//     console.log("Final message to be sent:", message);
//     console.log("📨 Sending notifications...");

//     // Send the message to each unique contact
//     for (const contact of uniqueContacts) {
//       try {
//         await twilioClient.messages.create({
//           body: message,
//           from: TWILIO_WHATSAPP_NUMBER,
//           to: `whatsapp:${contact}`
//         });
//         console.log(`✅ Sent to recipient (${contact})`);
//       } catch (error) {
//         console.error(`❌ Failed to send to ${contact}:`, error.message);
//       }
//     }
//   } catch (error) {
//     console.error("⚠️ Notification error:", error.message);
//   }
// }

// // Real-time listener for donation status updates
// function setupRealtimeListener() {
//   const channel = supabase
//     .channel("donation-tracker")
//     .on("postgres_changes", {
//       event: "UPDATE",
//       schema: "public",
//       table: "donation",
//     }, async (payload) => {
//       console.log("🔔 Donation update detected! Checking status...");
//       if (payload.new.status2 === "Delivered to NGO") {
//         console.log("🚀 Status is 'Delivered to NGO', sending notifications...");
//         await sendWhatsAppNotifications(payload.new);
//       } else {
//         console.log("ℹ️ Status update is not 'Delivered to NGO', ignoring.");
//       }
//     })
//     .subscribe(status => {
//       if (status === "SUBSCRIBED") {
//         console.log("🔔 Successfully connected to real-time channel");
//       }
//     });

//   return channel;
// }

// setupRealtimeListener();
// console.log("👂 Listening for donation status updates...");


// require("dotenv").config();
// const { createClient } = require("@supabase/supabase-js");
// const twilio = require("twilio");

// // Configure Supabase
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// // Initialize Twilio client
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Sandbox number
// const STUDENT_PHONE_NUMBER = "whatsapp:+917506979973"; // Student's phone number

// console.log("🚀 Starting student notification service...");

// // Function to send WhatsApp notifications to the student
// async function sendWhatsAppNotification(newEntryData) {
//   try {
//     console.log("📡 New entry detected in 'Id' table...");

//     // Construct the WhatsApp message
//     const message = `
//     📚 *Attendance Marked!*

//     🆔 *ID:* ${newEntryData.id || 'Not specified'}
//     👤 *Name:* ${newEntryData.uid || 'Not specified'}
//     📅 *Timestamp:* ${newEntryData.timestamp || 'Not specified'}

//     ✅ *Your attendance has been successfully marked.*
//     `.trim();

//     console.log("Final message to be sent:", message);
//     console.log("📨 Sending notification to student...");

//     // Send the message to the student's phone number
//     await twilioClient.messages.create({
//       body: message,
//       from: TWILIO_WHATSAPP_NUMBER,
//       to: STUDENT_PHONE_NUMBER
//     });

//     console.log(`✅ Sent notification to student (${STUDENT_PHONE_NUMBER})`);
//   } catch (error) {
//     console.error("⚠️ Notification error:", error.message);
//   }
// }

// // Real-time listener for new entries in the 'Id' table
// function setupRealtimeListener() {
//   const channel = supabase
//     .channel("student-notification-channel")
//     .on("postgres_changes", {
//       event: "INSERT",
//       schema: "public",
//       table: "Id",
//     }, async (payload) => {
//       console.log("🔔 New entry detected in 'Id' table!");
//       await sendWhatsAppNotification(payload.new); // Send notification
//     })
//     .subscribe(status => {
//       if (status === "SUBSCRIBED") {
//         console.log("🔔 Successfully connected to real-time channel");
//       }
//     });

//   return channel;
// }

// setupRealtimeListener();
// console.log("👂 Listening for new student entries in the 'Id' table...");



//My Notification ///
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








