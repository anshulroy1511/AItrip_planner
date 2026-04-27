# ✈️ AI Travel Planner

An intelligent, multi-user travel itinerary generator powered by OpenAI GPT-4o Mini and enriched with Unsplash destination imagery. Plan trips, customize itineraries day-by-day, and manage all your travel plans in one place.

🔗 **Live Demo:** [your-deployed-url.com](https://your-deployed-url.com)  
📹 **Walkthrough Video:** [Watch here](https://your-video-link.com)

---

## 📌 Project Overview

AI Travel Planner lets authenticated users:
- Generate complete day-by-day itineraries using AI
- Regenerate any specific day with custom preferences
- Add or remove individual activities from their itinerary
- Create and manage multiple trip plans from a personal dashboard
- View beautiful destination imagery sourced from Unsplash
- Smart Itinerary Alerts 
---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js + Tailwind CSS | SSR support, fast routing, utility-first styling |
| Backend | Node.js + Express | Lightweight, flexible REST API |
| Database | MongoDB | Schema flexibility for varied itinerary structures |
| AI | OpenAI GPT-4o Mini | Cost-efficient, fast, high-quality text generation |
| Images | Unsplash API | Free, high-quality destination photography |
| Auth | JWT + bcrypt | Stateless, secure token-based authentication |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- OpenAI API key
- Unsplash Access Key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:3000`

---

## 🌐 Deployed Setup

| Service | Platform |
|---|---|
| Frontend | Render |
| Backend | Render  |
| Database | MongoDB Atlas |

Environment variables are configured via each platform's dashboard — no secrets are committed to the repository.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js Frontend                │
│         (Pages · Components · Tailwind)      │
└─────────────────┬───────────────────────────┘
                  │  REST API (HTTP/JSON)
                  ▼
┌─────────────────────────────────────────────┐
│            Express.js Backend                │
│                                             │
│  ┌─────────────┐      ┌──────────────────┐  │
│  │   Routes    │      │   Middleware      │  │
│  │  /api/auth  │      │  JWT protect()    │  │
│  │  /api/trips │      │  Error Handler    │  │
│  └──────┬──────┘      └──────────────────┘  │
│         │                                   │
│  ┌──────▼──────────────────────────────┐    │
│  │           Controllers                │    │
│  │   authController · tripController   │    │
│  └──────┬─────────────────┬────────────┘    │
│         │                 │                 │
│  ┌──────▼──────┐   ┌──────▼─────────────┐  │
│  │   MongoDB   │   │   External APIs    │  │
│  │  (Mongoose) │   │  ┌──────────────┐  │  │
│  │             │   │  │ OpenAI GPT   │  │  │
│  │  · Users    │   │  │  4o Mini     │  │  │
│  │  · Trips    │   │  ├──────────────┤  │  │
│  │  · Alerts   │   │  │  Unsplash    │  │  │
│  └─────────────┘   │  │  Images API  │  │  │
│                    │  └──────────────┘  │  │
│                    └────────────────────┘  │
└─────────────────────────────────────────────┘
```


## 📁 Folder Structure

```
ai-travel-planner/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js       # Register, login logic
│   │   └── trip.controller.js       # Create, fetch, edit, regenerate trips
│   ├── middleware/
│   │   └── auth.middleware.js       # JWT protect() guard
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password)
│   │   └── Trip.js                  # Trip schema (itinerary, alerts, image)
│   ├── routes/
│   │   ├── auth.routes.js           # POST /register, /login
│   │   └── trip.routes.js           # All /api/trips endpoints
│   ├── services/
│   │   ├── openai.service.js        # Prompt builder + GPT-4o Mini calls
│   │   └── unsplash.service.js      # Destination image fetch
│   ├── .env                         # Environment variables (not committed)
│   └── server.js                    # Express app entry point
│
├── frontend/
│   ├── components/
│   │   ├── TripCard.jsx             # Dashboard trip preview card
│   │   ├── ItineraryDay.jsx         # Day view with activities + alerts
│   │   ├── AlertBadge.jsx           # info / warning / critical alert UI
│   │   ├── ActivityItem.jsx         # Single activity with delete button
│   │   └── Navbar.jsx               # Top navigation bar
│   ├── pages/
│   │   ├── index.jsx                # Landing / home page
│   │   ├── login.jsx                # Login page
│   │   ├── register.jsx             # Register page
│   │   ├── dashboard.jsx            # User's trip dashboard
│   │   ├── create-trip.jsx          # Trip input form
│   │   └── trips/
│   │       └── [id].jsx             # Trip detail + itinerary editor
│   ├── hooks/
│   │   └── useAuth.js               # Auth state + token management
│   ├── utils/
│   │   └── api.js                   # Axios instance with JWT header
│   ├── .env.local                   # Frontend env vars (not committed)
│   └── tailwind.config.js
│
└── README.md
```

## ✨ Creative Custom Features

### 📸 Unsplash Destination Imagery

**What it does:**
When a trip is created, the app automatically fetches a curated, high-quality destination photo from the Unsplash API and associates it with the trip. These images appear on the dashboard and trip detail pages.

**Why I built it:**
Travel planning is inherently visual. A blank card with just "Tokyo – 5 days" feels lifeless. Showing a stunning photo of the destination creates an emotional connection to the trip and makes the dashboard feel like a real travel product, not a utility tool.

**How it works:**
On trip creation, the backend queries the Unsplash Search API using the destination name, picks the top result, and stores the image URL in MongoDB. No repeated API calls on every render — persisted once at creation.

---

### 🔔 Smart Itinerary Alerts

**What it does:**
The AI agent automatically generates contextual travel alerts embedded within the itinerary — things a traveler needs to know before or during each day:

- 🕌 **Cultural advisories** — dress codes, photography restrictions, local customs
- 🌧️ **Weather warnings** — seasonal conditions, monsoon periods, extreme heat
- 💰 **Budget heads-up** — tourist traps, unexpectedly expensive areas
- 🏥 **Safety notices** — areas to avoid, common scams at landmarks
- 📋 **Logistics alerts** — advance booking needs, closures, visa restrictions

**Why I built it:**
Most AI travel tools focus purely on *what to do*. This adds the *what to know* layer — the difference between arriving prepared and being caught off guard. A generated itinerary without context can set travelers up for unpleasant surprises (showing up to a temple in shorts, a museum closed on Mondays, getting scammed at a landmark).

**How it works:**
Alerts are generated in the same OpenAI prompt as the itinerary. The model returns an `alerts` array per day following a strict schema:
