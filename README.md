# 🍱 Feeding Hands — Food Waste Reduction Platform

> **🏆 2nd Runner-Up (Top 3 of 700+ Teams) — Deep Blue Season 10 Hackathon by Mastek | ₹50,000 Cash Prize**

Feeding Hands bridges the gap between food donors, NGOs, and volunteers to minimize food waste — with real-time tracking, AI-powered freshness detection, and a gamified reward system that keeps donors coming back.

---

## 🎯 The Problem

Every day, massive amounts of edible food go to waste while NGOs struggle to source donations efficiently. There's no unified platform to connect surplus food with people who need it — in real time.

---

## ✅ What We Built

| Feature | Description |
|---|---|
| 🗺️ Real-Time Tracking | Live donation location visualization using Leaflet.js |
| 🤝 NGO–Donor Bridge | Streamlined flow connecting food donors directly to NGOs |
| 🧠 Freshness Detection | AI model estimates food freshness from images |
| 📅 Event Prediction | Prophet-based forecasting for high-donation events |
| 🎮 Punya Points | Gamified reward system to incentivize repeat donations |
| 👥 Volunteer Coordination | Tools for volunteers to manage pickups and deliveries |

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Leaflet.js
- **Backend / Database:** Supabase (PostgreSQL + Auth + Realtime)
- **AI / ML:** Python, Prophet (event forecasting), custom freshness detection model
- **Styling:** CSS / Bootstrap

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│              React Frontend             │
│   Leaflet Map | Donor UI | NGO Dashboard│
└────────────────┬────────────────────────┘
                 │ Supabase Realtime
┌────────────────▼────────────────────────┐
│           Express Backend              │
│   Auth | Database | Realtime Updates    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│            Python AI Layer              │
│   Prophet Forecasting | Freshness Model │
└─────────────────────────────────────────┘
```

---

## 🎮 Punya Points System

Donors earn **Punya Points** for every successful food donation:
- Points accumulate on a leaderboard
- Milestone badges unlock with consistent donations
- Designed to drive long-term engagement and repeat contributions

---

## 🏆 Achievement

Secured **3rd place nationwide** (2nd Runner-Up) among **700+ teams** at **Deep Blue Season 10**, organized by **Mastek** — a leading Indian IT company. Awarded a **₹50,000 cash prize**.

---

## 👤 Author

**Tanish Nagarkar**
[LinkedIn](https://linkedin.com/in/tanish-nagarkar-768384251) | [Email](mailto:tanishnagarkar@gmail.com)
