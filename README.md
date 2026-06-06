# Boxed With Care Movers Website

## Overview

This repository contains the frontend and backend for the `Boxed With Care Movers` website, a responsive marketing site built with React, Vite, and Tailwind CSS. The site includes a hero section, services, why-us section, testimonials, quote request form, and an admin dashboard for content management and lead review.

## Key Features

- Responsive marketing pages for moving and packing services.
- Dynamic site content loaded from backend JSON data.
- Quote request form with email, WhatsApp, and lead persistence.
- Blog section with featured moving tips and planning guides.
- Admin dashboard for editing site content, uploading images, and reviewing leads.
- Backend API for content, leads, authentication, and file uploads.
- Optional Google Reviews integration via Places API.

## Tech Stack

- Frontend: React + TypeScript
- Bundler: Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express
- Authentication: JWT for admin routes
- Storage: Local JSON files (`server/data/content.json`, `server/data/leads.json`)

## Project Structure

- `index.html` - Main HTML entry point.
- `src/` - React application source code.
  - `App.tsx` - Main site entry point and admin routing.
  - `components/` - UI components for homepage, admin dashboard, and form.
  - `lib/` - Shared utilities and API client.
- `server/` - Backend API server.
  - `index.js` - Express API, authentication, file upload, and data persistence.
  - `data/` - Default JSON content and saved leads.
  - `uploads/` - Stored uploaded images.
- `public/` - Static assets served by Vite.

## Running Locally

### Prerequisites

- Node.js 18+ installed
- npm available

### Install dependencies

```bash
npm install
```

### Run frontend only

```bash
npm run dev
```

Then open `http://localhost:5174`.

### Run backend only

```bash
npm run backend
```

Backend starts by default on `http://localhost:5175`.

### Run both frontend and backend together

```bash
npm run dev:all
```

This uses `concurrently` to start both the Vite frontend and Express backend.

## Build and Preview

```bash
npm run build
npm run preview
```

`npm run build` produces a production-ready frontend bundle in `dist/`.

## Environment Variables

The repository includes `.env` support for backend configuration.

- `ADMIN_USER` - Admin username (default: `admin`)
- `ADMIN_PASSWORD` - Admin password (default: `BWC@2025!`)
- `ADMIN_JWT_SECRET` - Secret key for signing admin JWTs
- `GOOGLE_PLACES_API_KEY` - Google Places API key for reviews
- `GOOGLE_PLACE_ID` - Place ID for Google reviews lookup
- `BACKEND_PORT` - Custom backend port (default: `5175`)

Example:

```env
ADMIN_USER=admin
ADMIN_PASSWORD=BWC@2025!
ADMIN_JWT_SECRET=change-this-secret
GOOGLE_PLACES_API_KEY=YOUR_KEY
GOOGLE_PLACE_ID=YOUR_PLACE_ID
BACKEND_PORT=5175
```

## Frontend Behavior

### Content Loading

The app uses `src/lib/api.ts` to fetch site content from `/api/content`. If the backend is unavailable, the app falls back to default content defined in `src/lib/siteContent.ts`.

### Admin Mode

The app detects admin access when the path begins with `/admin` or the hostname begins with `admin.`. In admin mode, the app renders `src/components/Admin.tsx` instead of the public homepage.

### Quote Requests

The `QuoteForm` component collects user details and:

- Sends the lead to the backend via `POST /api/leads`
- Opens a WhatsApp chat using the configured phone number
- Opens the user's email client with a prefilled `mailto:` request

Lead records are persisted in `server/data/leads.json`.

## Backend API Endpoints

- `POST /api/login` - Admin login returns a JWT token.
- `GET /api/me` - Verify admin JWT.
- `GET /api/content` - Fetch site content.
- `POST /api/content` - Save site content (admin only).
- `GET /api/leads` - Fetch submitted leads (admin only).
- `POST /api/leads` - Store a new quote lead.
- `DELETE /api/leads/:id` - Delete a lead (admin only).
- `POST /api/upload` - Upload an image file for admin content editing (admin only).
- `GET /api/google-reviews` - Fetch Google Places reviews if API keys are configured.

## Admin Dashboard

The admin experience supports:

- Logging in with admin credentials
- Editing homepage content fields
- Uploading and cropping hero, why-us, and service images
- Reviewing leads and deleting entries
- Automatically refreshing leads periodically
- Saving content to `server/data/content.json`

## Customization

Content is driven by `server/data/content.json` and `src/lib/siteContent.ts` default values. Editable fields include:

- `siteName`
- `siteTagline`
- `heroHeadline`
- `heroSubtext`
- `heroCTA`
- `heroBgImage`
- `phone`
- `email`
- `footerText`
- `serviceImages`
- `whyUsImage`
- `blogSectionHeadline`
- `blogSectionSubtext`
- `blogPosts`

## Notes

- Uploaded files are saved to `server/uploads/`.
- The backend stores leads in `server/data/leads.json`, so this repository is not production-ready for high traffic without migrating to a real database.
- The admin panel uses JWT authentication stored in local storage.

## Useful Scripts

- `npm run dev` - Start frontend dev server
- `npm run backend` - Start backend API server
- `npm run dev:all` - Start frontend + backend together
- `npm run build` - Build frontend for production
- `npm run preview` - Preview built site
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

---

For questions about deployment or customization, open an issue or ask for a walkthrough of the code. 