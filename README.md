# ✈️ AI Travel Planner

An intelligent, multi-user travel itinerary generator powered by OpenAI GPT-4o Mini and enriched with Unsplash destination imagery. Plan trips, customize itineraries day-by-day, and manage all your travel plans in one place.

🔗 **Live Demo:** [www.aitripplanner.com](https://aitrip-planner-frontend.onrender.com)  
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
git clone https://github.com/anshulroy1511/AItrip_planner.git
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
TRIO/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js                    # MongoDB connection setup
│       ├── controllers/
│       │   ├── auth.controller.js       # Register, login logic
│       │   └── trip.controller.js       # Create, fetch, edit, regenerate trips
│       ├── middleware/
│       │   └── auth.middleware.js       # JWT protect() guard
│       ├── models/
│       │   ├── Trip.js                  # Trip schema (itinerary, alerts, image)
│       │   └── User.js                  # User schema (name, email, password)
│       ├── routes/
│       │   ├── auth.routes.js           # POST /register, /login
│       │   ├── image.routes.js          # Unsplash image endpoints
│       │   ├── test.routes.js           # Health check / test routes
│       │   └── trip.routes.js           # All /api/trips endpoints
│       ├── services/
│       │   ├── ai.service.js            # Prompt builder + GPT-4o Mini calls
│       │   └── image.service.js         # Unsplash destination image fetch
│       ├── utils/
│       │   └── generateToken.js         # JWT token generation helper
│       └── server.js                    # Express app entry point
│   ├── .env                             # Environment variables (not committed)
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── create-trip/
│       │   │   └── page.jsx             # Trip input form
│       │   ├── dashboard/
│       │   │   └── page.jsx             # User's trip dashboard
│       │   ├── login/
│       │   │   └── page.jsx             # Login page
│       │   ├── register/
│       │   │   └── page.jsx             # Register page
│       │   ├── trip/[id]/
│       │   │   └── page.jsx             # Trip detail + itinerary editor
│       │   ├── globals.css              # Global styles
│       │   ├── layout.js                # Root layout wrapper
│       │   └── page.js                  # Landing / home page
│       ├── components/
│       │   └── TripCard.jsx             # Dashboard trip preview card
│       └── services/
│           └── api.js                   # Axios instance with JWT header
│   ├── public/                          # Static assets
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   └── next.config.mjs
│
└── README.md
```


## 🔐 Authentication & Authorization

- Users register with name, email, and password
- Passwords are hashed using **bcrypt** before storage
- On login, a signed **JWT** is returned and stored client-side
- All trip routes are protected by the `protect` middleware, which validates the JWT on every request
- Every trip query is scoped to `req.user._id` — users can only read or modify their own data
- No trip endpoint exposes another user's data under any condition

---

## 🤖 AI Agent Design

The AI agent is powered by **OpenAI GPT-4o Mini** via the Chat Completions API.

### How it works:

**Trip Generation**  
A structured prompt is built from the user's inputs (destination, days, budget, interests) and sent to GPT-4o Mini. The model returns a JSON-structured day-by-day itinerary and a budget breakdown.

**Day Regeneration**  
When a user requests to regenerate a specific day, the existing itinerary context plus the target day and new preference (e.g. "more outdoor activities") are sent back to the model. Only that day's activities are replaced — the rest of the itinerary is preserved.

**Prompt Design Principle:**  
Prompts enforce JSON-only responses with a defined schema so the backend can reliably parse and store structured output without any post-processing guesswork.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Trips (all protected — JWT required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trips` | Generate a new AI trip |
| GET | `/api/trips` | Fetch all trips for logged-in user |
| GET | `/api/trips/dashboard` | Fetch trips for dashboard summary |
| GET | `/api/trips/:id` | Get a specific trip by ID |
| PUT | `/api/trips/:id/add-activity` | Add an activity to a day |
| PUT | `/api/trips/:id/remove-activity` | Remove an activity from a day |
| PUT | `/api/trips/:id/regenerate-day` | Regenerate a specific day via AI |

---


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
