# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Nishant Kumar (notsoshant.org) — React 19 + Vite, deployed on Vercel.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # eslint .
```

There is no test suite configured in this repo.

## Environment

Requires a `.env` file (gitignored) with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BASE_PATH=...   # optional, overrides the Vite base path
```

`vite.config.js` sets `base` to `/` in dev and `/personal-website/` in production builds unless `VITE_BASE_PATH` overrides it — keep this in mind if links/assets appear broken only in production builds.

## Architecture

**Data layer: Supabase, not local JSON.** The site was migrated off static JSON files to a Supabase Postgres backend. All content (projects, uses/gear, tech stack, gallery images) is fetched at runtime through `src/lib/dataService.js`, which wraps four tables (`projects`, `uses`, `techstack`, `gallery`) via `src/lib/supabaseClient.js`. Every fetch function renames the DB column `description` back to `desc` (`normalize()` in `dataService.js`) so components didn't need to change during the migration. Stale copies of the old data still live in `src/data/*.json` but are **no longer imported anywhere** — don't extend those files, add new content via Supabase instead.

**Two separate Supabase Storage helpers exist and are not interchangeable:**
- `src/lib/imageFetch.js` → `getPublicUrl(path)` — reads from the **`gallery`** bucket, used by `Gallery.jsx`.
- `src/lib/assets.js` → `publicUrl(path)` — reads from the **`assets`** bucket, used by `VideoBg.jsx` for the background video.

When adding a feature that serves files from Supabase Storage, check which bucket the asset actually lives in before picking a helper.

**Pages fetch their own data.** There's no global data store — each page component (`Projects.jsx`, `Gallery.jsx`, `Uses.jsx`, `About.jsx`) calls the relevant `dataService.js` fetch function in a `useEffect`, holds the result in local state, and filters client-side by category. Follow this same per-page fetch-and-filter pattern for new data-driven pages rather than introducing a global store.

**Routing** is plain `react-router-dom` (`BrowserRouter`) wired up in `src/App.jsx`: `/`, `/projects`, `/tools`, `/uses`, `/gallery`. `Tools.jsx` is a placeholder ("Work in progress"). Add new routes in both `App.jsx` and the nav link list in `src/components/Navbar.jsx`.

**Loading screen** (`Loader.jsx`) gates the whole app on initial mount via `isLoading` state in `App.jsx`, wrapped in `framer-motion`'s `AnimatePresence`.

**Error logging is verbose and structured by design**, not an accident to clean up. Nearly every data-fetching path (Supabase client init, `dataService.js`, `VideoBg.jsx`) logs a structured object (`{timestamp, context, error, severity, impact, solution}`) to the console with a distinguishing emoji prefix per domain (🚨 supabase, 📁 storage/projects, 🎥 video, 👤 about). `src/lib/errorLogger.js` defines the shared factory (`createErrorLogger`) and helpers (`setupGlobalErrorHandling`, `getUserFriendlyMessage`), but several components (`dataService.js`, `VideoBg.jsx`, `Projects.jsx`) still define their own local, near-identical logging closures instead of importing from it — match whichever pattern the file you're editing already uses rather than mixing both.

**Styling**: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` — theme is defined inline in `src/index.css` using `@theme`, `@utility`, and `@layer components`). Custom design tokens (`--color-bright-purple`, `--font-head`, etc.) and utility classes (`text-gradient`, `flex-center`, `col-center`, `abs-center`) are defined there — prefer reusing them over redefining equivalent Tailwind arbitrary values.

**CI**: `.github/workflows/keep-alive.yml` pings a `keep_alive` Supabase table every 3 days via `workflow_dispatch`/cron to prevent the free-tier Supabase project from pausing due to inactivity. It relies on `SUPABASE_URL`/`SUPABASE_ANON_KEY` GitHub secrets, separate from the local `.env`.

**Vercel**: `vercel.json` rewrites all paths to `/` for client-side routing (SPA fallback).
