# BookIt — Experiences & Slots (Fullstack)

This repository contains a demo fullstack booking app (BookIt) built to satisfy the assignment requirements: Next.js + TypeScript frontend with Tailwind, and a Node/Express + TypeScript backend with MongoDB.

What I scaffolded so far
- Backend: Express + TypeScript skeleton, MongoDB connector, Experience and Booking models, controllers and routes for GET /experiences, GET /experiences/:id, POST /bookings, and POST /bookings/promo/validate. Seed script to insert demo experiences.
- Frontend: Minimal Next.js + TypeScript scaffold with Tailwind config and pages for Home, Experience details, Checkout, and Result. Dev-time proxy rewrites `/api/*` to the backend at `http://localhost:5000`.

Auth & additional pages
- The frontend now includes Firebase Email/Password auth flows and several auth-related pages:
	- `/signin` — sign in with email + password
	- `/signup` — create an account
	- `/forgot-password` — send password reset email
	- `/account` — protected account page showing email and uid
	- `/settings` — protected settings placeholder
	- A responsive `Sidebar` component with account snippet and Log out action

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

Firebase (Auth) setup
1. Create a Firebase project at https://console.firebase.google.com/.
2. In the Firebase console, enable Email/Password sign-in under Build → Authentication → Sign-in method.
3. Copy your Firebase config (apiKey, authDomain, projectId, etc.). There is a `frontend/src/firebase.ts` file with an example object. You can either:
	 - Replace the values in `frontend/src/firebase.ts` with your own config, or
	 - Preferably, keep config out of source by using environment variables and reading them at runtime (the current scaffold inlines the config for convenience).

Environment variables
- Backend (`backend/.env`) — create a `.env` file with at least:
	- `MONGO_URI` — your MongoDB connection string
	- `PORT` — optional (defaults to 5000)

- Frontend — if you prefer to use env vars for Firebase, add the usual `NEXT_PUBLIC_*` variables and load them in `frontend/src/firebase.ts`.

Troubleshooting & notes
- If you see Next.js errors about invalid `<Link>` usage after upgrading Next, update link usage to the new API (avoid nested `<a>` inside `<Link>`). The scaffold already uses the new API in `frontend/src/components/Sidebar.tsx`.
- If `npm install` fails with `ETARGET` for `firebase@^10.15.0`, edit `frontend/package.json` to a published version (e.g., `^10.14.0`) or run `npm install firebase@latest`.
- Do not commit `.env` files with secrets.
- The repo previously contained a large platform-specific SWC binary; if you encounter push errors about file sizes, run the repository cleanup script we added or follow the documented GitHub guidance for removing large files from history.

What I changed recently
- Added Sign-in / Sign-up / Forgot-password / Account / Settings pages and an `AuthProvider` (context) so the app can track the signed-in user.
- Added a protected `/account` and `/settings` routes that redirect unauthenticated users to `/signin`.
- Added a `Sidebar` with sign-out wired to Firebase signOut.

Next recommended steps
- Replace the sample Firebase config with your project values or wire env vars.
- Run the backend (`npm run dev`) and seed the DB (if needed): `cd backend && npm run seed && npm run dev`.
- Start the frontend: `cd frontend && npm install && npm run dev` and test auth flows.

If you want, I can:
- Add environment-variable based Firebase config and a small README snippet showing how to set `NEXT_PUBLIC_FIREBASE_API_KEY` and friends.
- Add a small settings form that updates the Firebase `displayName` via `updateProfile`.
- Help remove the large SWC binary from git history (we already added a PowerShell helper script — it must be run locally because it rewrites git history).

Deployment suggestions
- Frontend: Vercel — push the frontend `frontend/` folder and set environment variables for the backend base URL in production.
- Backend: Render (or Railway) — deploy the backend service and set the `MONGO_URI` environment variable in the Render dashboard. When deployed, update the frontend to call the backend production URL instead of the local proxy.

Next steps I will do when you ask me to continue
- Implement UI that matches the provided Figma exactly, including spacing and typography.
- Add input validation, promo code UX, price calculations, and double-booking prevention tests.
- Add more seeded realistic data and micro-interactions.

If you want me to continue now, reply "continue" and I will implement the backend routes fully (they exist now) and finish the frontend pages to match the Figma design and flow: Home → Details → Checkout → Result, and then prepare deployment to Vercel + Render.
