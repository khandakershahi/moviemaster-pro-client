# MovieMaster Pro — Client

Modern movie management SPA with dashboards, filtering, watchlists, and reviews.

## Features

- Auth: email/password, Google, demo autofill/copy credentials
- Movies: search/filter/sort/paginate, details, add/edit/delete (owner), watchlist
- Dashboard: profile update, stats with charts, my collection, my reviews
- UI/UX: skeletons + loaders, dark/light toggle (persisted), responsive layout
- Reviews: add/read reviews, user-scoped review view
- Theming: DaisyUI/Tailwind with Firebase-hosted frontend

## Tech Stack

- React 19, Vite, React Router
- Tailwind CSS + DaisyUI, Animate.css, Swiper, Recharts
- Firebase Auth, Axios (secure interceptor)
- React Hot Toast, SweetAlert2
- Backend: Express + MongoDB (deployed separately)

## Screenshots

![App Logo](public/logo.png)
![App Preview](public/screenshot.png)

## Getting Started

1) `npm install`
2) Create `.env.local` with:
   - `VITE_API_URL=https://your-vercel-api.example.com`
   - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, etc.
3) `npm run dev` and open http://localhost:5173
4) Build for hosting: `npm run build`

## Deployment

- Frontend: Firebase Hosting (see firebase.json rewrite for SPA)
- Favicon/logo: public/logo.png

## Links

- Live: https://movie-master-pro-ks.web.app/
- Repo: https://github.com/khandakershahi/moviemaster-pro-client
