# HiddenSpot — Frontend

A field guide to Dhaka's hidden gems and micro-adventures. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Recharts.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first theme config)
- **Charts:** Recharts
- **HTTP client:** Axios
- **Icons:** Lucide React

## Features

- Landing page with interactive hero, featured spots, category browsing, and a spots-by-category chart
- Explore page with live search, category/difficulty filters, sorting, and pagination
- Spot details page with image gallery, reviews, and related spots
- JWT-based auth (register/login, demo login button) via a custom `AuthContext`
- Protected routes: Add Spot, Manage Spots (view/delete)
- Fully responsive, custom teal/gold/paper design system

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update this to your deployed backend URL when going to production.

### 3. Run the dev server

Make sure the backend is running first, then:
```bash
npm run dev
```
Visit `http://localhost:3000`.

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@hiddenspot.com` | `admin123` |
| User | `demo@hiddenspot.com` | `demo123` |

(Or use the **"Try demo account"** button on the login page.)

## Project Structure
```
src/
  app/           — Pages (App Router): /, /explore, /spots/[id], /spots/add,
                   /spots/manage, /login, /register, /about, /contact
  components/    — Navbar, Footer, SpotCard, Hero, forms, filters, etc.
  context/       — AuthContext (global auth state, JWT persistence)
  lib/           — Axios API client
  types/         — Shared TypeScript types (mirrors backend models)
```

## Design System

- **Colors:** deep petrol teal (primary), marigold gold (accent), warm paper (background) — max 3 primary colors per project requirements
- **Type:** Fraunces (display/headings), Manrope (body)

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run production build |

## Notes

- All spot data is real (real Dhaka locations, descriptions, and images) — no placeholder/lorem ipsum content.
- Images are loaded via direct Unsplash CDN URLs (`images.unsplash.com/photo-...`); avoid `source.unsplash.com` links, which were deprecated in 2024 and no longer resolve.
