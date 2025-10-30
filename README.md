# BookIt — Experiences & Slots (Fullstack)

This repository contains a demo fullstack booking app (BookIt) built to satisfy the assignment requirements: Next.js + TypeScript frontend with Tailwind, and a Node/Express + TypeScript backend with MongoDB.

What I scaffolded so far
- Backend: Express + TypeScript skeleton, MongoDB connector, Experience and Booking models, controllers and routes for GET /experiences, GET /experiences/:id, POST /bookings, and POST /bookings/promo/validate. Seed script to insert demo experiences.
- Frontend: Minimal Next.js + TypeScript scaffold with Tailwind config and pages for Home, Experience details, Checkout, and Result. Dev-time proxy rewrites `/api/*` to the backend at `http://localhost:5000`.

Notes about the current state
- The project is scaffolded and ready for development. The backend and frontend dependencies need to be installed before running.
- The seed script will only insert demo data if the `experiences` collection is empty.
- Do NOT commit a real `.env` with credentials. Use the `.env.example` in `backend/` as a template.

Local development (Windows / PowerShell)

1) Backend — install dependencies and run the server

```powershell
cd d:\BookIt\backend
npm install
# create a .env file with MONGO_URI and optional PORT
# e.g. MONGO_URI="your_mongo_connection_string"
npm run seed   # run once to insert demo experiences
npm run dev
```

The backend will start on port 5000 by default.

2) Frontend — install and run

```powershell
cd d:\BookIt\frontend
npm install
npm run dev
```

The frontend dev server will run on `http://localhost:3000`. The Next.js config rewrites `/api/*` to `http://localhost:5000/*` so calls to `/api/experiences` will reach the backend.

Deployment suggestions
- Frontend: Vercel — push the frontend `frontend/` folder and set environment variables for the backend base URL in production.
- Backend: Render (or Railway) — deploy the backend service and set the `MONGO_URI` environment variable in the Render dashboard. When deployed, update the frontend to call the backend production URL instead of the local proxy.

Next steps I will do when you ask me to continue
- Implement UI that matches the provided Figma exactly, including spacing and typography.
- Add input validation, promo code UX, price calculations, and double-booking prevention tests.
- Add more seeded realistic data and micro-interactions.

If you want me to continue now, reply "continue" and I will implement the backend routes fully (they exist now) and finish the frontend pages to match the Figma design and flow: Home → Details → Checkout → Result, and then prepare deployment to Vercel + Render.
