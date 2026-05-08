# TubeGrab - Premium YouTube Downloader

A high-fidelity, cinematic YouTube video downloader built with React, Tailwind CSS, and Supabase.

## 🎨 Features
- Modern Dark UI with glassmorphism effects.
- Vivid red accent glows and premium animations.
- Responsive design for all devices.
- High-quality 1080p video download support.
- Real-time video metadata fetching via Supabase Edge Functions.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TypeScript, TanStack Query.
- **Backend:** Supabase (Database + Edge Functions).
- **Styling:** Tailwind CSS, Lucide React.

## 🚀 Deployment Guide

This project is designed to be deployed independently using Supabase for the backend and any static hosting for the frontend.

### 1. Supabase Setup
- Create a new project on [Supabase](https://supabase.com).
- Run the migration found in `supabase/migrations/` in your Supabase SQL Editor.
- Deploy Edge Functions:
  ```bash
  supabase functions deploy get-video-info --no-verify-jwt
  supabase functions deploy download-video --no-verify-jwt
  ```
- Set environment variables for Edge Functions in Supabase:
  - `SUPABASE_URL`: Your project URL.
  - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (for database operations).

### 2. Frontend Deployment (Vercel / Netlify / Cloudflare Pages)
- Connect your repository to your hosting provider.
- Set the following environment variables:
  - `VITE_SUPABASE_URL`: Your Supabase Project URL.
  - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
- Build Command: `npm run build`
- Output Directory: `dist`

### 3. Local Development
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your Supabase credentials.
3. `npm run dev`
