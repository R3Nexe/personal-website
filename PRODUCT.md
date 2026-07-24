# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

General personal-showcase audience — no single conversion-focused visitor type is targeted. Visitors may be recruiters, peers/collaborators, fellow developers, or anyone who lands on notsoshant.org to see who Nishant Kumar is and what he's made. The site is not optimized around a single funnel or CTA.

## Product Purpose

A personal portfolio for Nishant Kumar — B.Tech student and frontend developer based in Odisha, India. It documents projects, tech stack, gear/setup ("Uses"), and photography ("Gallery"), and serves as a personal space rather than a lead-gen or job-application tool. Success is an accurate, current, self-owned record of his work and interests that he's proud to link people to.

## Positioning

Leads with technical depth: real projects, ML/AI work, and code substance over visual polish or personal-brand narrative. The differentiator from a typical student portfolio is demonstrated capability (working Supabase-backed data layer, real projects, ML internship experience) rather than presentation alone.

## Operating Context

- Deployed on Vercel at notsoshant.org, built with React 19 + Vite, content served from a Supabase Postgres backend (`projects`, `uses`, `techstack`, `gallery` tables) via `src/lib/dataService.js`.
- Site sections/routes: Home (`/`, hero + About), Projects (`/projects`), Tools (`/tools`, placeholder/WIP), Uses (`/uses`, gear list), Gallery (`/gallery`, photography).
- Resume is served as a static PDF at `/resume/nishant_kumar.pdf`, linked from the hero "View Resume" button.
- Social presence: GitHub (github.com/R3Nexe) and LinkedIn, surfaced as icon links on the About card.

## Capabilities and Constraints

- Content (projects, gear, tech stack, gallery images) is managed via Supabase, not hardcoded — new content should go through Supabase per `dataService.js`, not `src/data/*.json` (stale, unused).
- Tech stack displayed on the About section is grouped by type: language, library, framework, software.
- Education (ITER Bhubaneshwar B.Tech 2024–present, GPA 9.68/10; prior CBSE/ICSE schooling) and experience (ML Internship at Elevate Labs, 45 days) are shown in a tabbed card on About — this is real, current biographical data, not placeholder content.
- `Tools.jsx` is explicitly a known-incomplete placeholder page ("Work in progress"), not a bug.
- No test suite is configured; correctness is verified by lint + manual review.

## Brand Commitments

- Domain/name: notsoshant.org — locked in as identity.
- Visual identity is locked in as a durable brand commitment: bright-purple accent (`--color-bright-purple`), dark theme, full-bleed looping video background (`VideoBg.jsx`), and the existing Tailwind v4 token system in `src/index.css`. Future visual work should extend this system rather than replace it, per the user's explicit confirmation.

## Evidence on Hand

- Real project data lives in Supabase (`projects` table) — see `Projects.jsx` for consumption pattern.
- Real photography lives in the Supabase `gallery` storage bucket, surfaced via `Gallery.jsx`.
- Real resume PDF at `/resume/nishant_kumar.pdf`.
- Real social links: github.com/R3Nexe, linkedin.com/in/nishant-kumar-b91a96325.
- No testimonials, case studies, press, or third-party proof exist — do not fabricate any.

## Product Principles

1. Substance over performance: real projects, real credentials, real data — no placeholder content presented as real.
2. Content lives in Supabase, not in components — pages fetch-and-filter per page, no global store.
3. The dark/purple/video-background visual identity is settled; new work extends it rather than reinventing it.
4. No single conversion goal — the site optimizes for being an accurate, current personal record, not a funnel.
5. Verbose, structured error logging throughout data-fetching paths is intentional and should be preserved in new data-driven features.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established.
