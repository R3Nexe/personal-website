---
name: Nishant Kumar — Personal Portfolio
description: A dark, gravitational space-void interface with a single luminous purple accent.
colors:
  nebula-purple: "#9A70F5"
  void-black: "#000000"
  off-white: "#EAEAEA"
  signal-green: "#82FF9E"
  signal-green-bright: "#64F58D"
  surface-charcoal: "#1a1a1a"
  surface-charcoal-light: "#2a2a2a"
  border-graphite: "#454545"
typography:
  display:
    fontFamily: "Orbitron, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  label:
    fontFamily: "Exo 2, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.05em"
  micro-label:
    fontFamily: "Exo 2, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
  body:
    fontFamily: "Exo 2, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  mono:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.01em"
rounded:
  none: "0px"
  pill: "9999px"
  lg: "12px"
  xl: "16px"
  xxl: "24px"
components:
  button-bracket-primary:
    backgroundColor: "transparent"
    textColor: "{colors.off-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 22px"
  button-bracket-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.nebula-purple}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 22px"
  card-default:
    backgroundColor: "{colors.surface-charcoal}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.xl}"
    padding: "24px"
  nav-pill:
    backgroundColor: "transparent"
    textColor: "#d4d4d4"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
---

# Design System: Nishant Kumar — Personal Portfolio

## Overview

**Creative North Star: "The Event Horizon"**

The site reads as the edge of a black hole: an almost total void (`#000000`) with a single luminous gravity-well — the Nebula Purple accent — that everything else bends toward. The looping accretion-disk video behind the hero is not decoration bolted onto a generic dark theme; it is the thesis the rest of the system follows. Orbitron's angular, instrument-panel letterforms carry every headline like a readout on a spacecraft console, while Exo 2 — its designed companion face — handles everything meant to be read continuously, so the voice never fights itself between display and body copy.

Surfaces are frosted glass panels (`backdrop-blur-xl`, low-opacity borders) that sit flat and quiet against the void until touched: hover and focus are what summon the purple glow, the lift, the scale. Nothing announces itself at rest. This isn't minimalism for its own sake — it's gravity: attention is pulled toward the one accent color and toward whatever the visitor's cursor approaches, exactly like the `MagneticButton` component that lets icons physically drift toward the pointer.

Color stays almost monochrome by design. Signal Green is not a secondary brand color in general circulation — it appears exactly once per achievement metric (GPA, exam percentage) as a marker of verified fact, not decoration. Its rarity is what gives it meaning. Color is also always flat: no gradient ever fills text or a button, by explicit direction — the earlier gradient-text treatment on the hero name and achievement metrics has been replaced system-wide with solid color, matched to reference material (`inspo/components.jpg`, `inspo/button style.jpg`) that reads as flat instrument-panel chrome rather than soft marketing gloss.

**Key Characteristics:**
- Near-total void base (`#000000`) with one accent color in general use (Nebula Purple)
- Frosted-glass panels at rest; purple glow, scale, and lift only on hover/focus
- Orbitron for every headline and label-of-consequence; Exo 2 for everything continuous
- Pill-shaped (`rounded-full`) navigation and filter chips; sharp-cornered bracket buttons for actions; `rounded-2xl` content cards (The Pill-or-Sharp Rule)
- Signal Green reserved exclusively for verified achievement metrics; all color is flat, never gradient-filled (The Flat Rule)
- A persistent, site-wide "mission dossier" HUD chrome layer (hairline grid, corner registration marks, tracked micro-metadata, reticle motifs, bracket buttons) reinforces the Event Horizon on every page, not just the hero

## Colors

The palette is almost monochrome on purpose — void, off-white, and exactly one accent color in general circulation, with a second accent held in reserve for one specific job.

### Primary
- **Nebula Purple** (`#9A70F5`): The single accent in general circulation. Used for the solid hero name, primary CTA borders, card glow-on-hover, and every "this is interactive" signal in the system.

### Secondary
- **Signal Green** (`#82FF9E`) and **Signal Green Bright** (`#64F58D`): Reserved exclusively for real, verified achievement metrics — GPA, exam percentages — as a solid, bold-weight text color (`text-green font-semibold`). Never used decoratively or for general UI accenting.

### Neutral
- **Void Black** (`#000000`): The base surface for `html`/`body`. The system has no "dark gray" base — it is genuinely black, letting the video and glow read as the only light sources.
- **Off-White** (`#EAEAEA`): Primary text color and the primary-button fill.
- **Surface Charcoal** (`#1a1a1a`) / **Surface Charcoal Light** (`#2a2a2a`): Card and panel backgrounds, always at partial opacity over the void, never opaque.
- **Border Graphite** (`#454545`): Card borders, always at ~50% opacity — a hairline, not a frame.

### Named Rules
**The Rare Signal Rule.** Signal Green appears only on real, verifiable achievement metrics, as a flat solid color (never a gradient — see The Flat Rule). It never decorates a heading, a button, or a hover state — with one explicit, user-directed exception: the purple/green **Glitch** motion detail (see Elevation & Depth) uses Signal Green as a chromatic-split accent, not as a color fill. It never colors text or a surface; it only ever appears as a brief, corner-anchored RGB-split echo.

**The Flat Rule.** No gradient ever fills text, and no button is ever gradient-filled. Color is flat and solid everywhere it's read as color — the hero name, achievement metrics, and every button are solid Nebula Purple, solid Signal Green, or solid off-white. The only gradients left in the system are the low-opacity glass-panel tints on card backgrounds (translucency, not decoration) and the loader's progress-bar fill. Introduced by explicit user direction, replacing the system's earlier gradient-text treatment.

## Typography

**Display Font:** Orbitron (with sans-serif fallback)
**Body Font:** Exo 2 (with sans-serif fallback)

**Character:** Orbitron's geometric, angular letterforms carry the "space console" voice on every headline, page title, and the loader's HUD-style percentage counter. Exo 2 — Orbitron's designed companion on Google Fonts — takes over the instant text needs to be read rather than announced: navigation, tracked uppercase labels, and body prose.

### Hierarchy
- **Display** (400, `clamp(2.25rem, 6vw, 6rem)`, 1.1): Hero name, "About Me", page titles (My Projects / My Gallery / My Daily Drive).
- **Label** (500, 14px, tracking 0.05em, uppercase where used): Nav links, the loader's "Materialising Site..." caption, tracked captions.
- **Micro-label** (600, 11px, tracking 0.14em, uppercase, 50%-opacity off-white): Subordinate category labels inside a denser panel where a full Label role would compete with the panel's own heading — e.g. the About tech-stack group headings (Languages / Libraries / Frameworks / Software), which sit inside a card already titled by a Display-role heading.
- **Body** (400, 14px, line-height 1.6): About section prose, project/uses card descriptions. Keep prose short — cards are compact, not long-form.
- **Mono** (400, 10px, line-height 1.8, IBM Plex Mono): Real diagnostic/telemetry data only — viewport size, timezone, module count. Never body prose, never a label a proportional face could carry.

### Named Rules
**The Two-Voice Rule.** Two type families carry the whole visual voice: Orbitron for anything that announces, Exo 2 for anything that's read. No italics. A third family — IBM Plex Mono — is permitted under the rule's own escape clause ("a role only a third voice could perform"): it exists solely for the About telemetry readout, where genuine measurement data (`SYS.CLIENT VIEWPORT 1440×900`) needs monospace alignment that a proportional face can't give it. Mono never appears anywhere else — not in a heading, not in body copy, not as a stylistic flourish.

## Layout

Single-column, full-viewport sections (`min-h-screen` / `min-h-dvh`) stacked vertically per page — Home's hero and About are both full-height sections; Projects, Uses, and Gallery use a centered container with responsive column counts (Gallery's masonry grid runs 1/2/3/4 columns from mobile to desktop via CSS `columns`). The About section switches from a stacked mobile layout to an 8-column desktop grid with explicit `col-span`/`row-span` placement rather than a generic auto-grid — card sizing is deliberate, not automatic. Density is comfortable, not dense: generous vertical rhythm between sections, `gap-4`–`gap-6` internal spacing inside cards. No custom spacing scale is defined; the system uses Tailwind's default scale as-is.

Every page shares two structural layers on top of its own content: the global `HudChrome` (mounted once in `App.jsx`, so it's automatic on every route, not opted into per page) and, for the four non-Home pages, the shared `PageHeader` pattern (tracked eyebrow + Display-role title + faint reticle ring) in place of an ad-hoc `<h1>`. New pages should mount neither manually beyond using `PageHeader` for their title — `HudChrome` is already global.

## Elevation & Depth

This system is flat by default and uses glow, not shadow, to signal depth. Cards and panels sit on frosted glass (`backdrop-blur-xl`/`backdrop-blur-3xl`) with a hairline border — there is no resting `box-shadow` establishing a base elevation. Depth appears only as a response to interaction: hover lifts a card (`translateY(-5px)`, `scale(1.02)`) and summons a soft purple glow (`box-shadow: 0 20px 40px rgba(154, 112, 245, 0.15)`, or the `shadow-bright-purple/50` utility). The nav pill, mobile menu overlay, and gallery filter bar use blur for separation from the video background instead of shadow.

### Shadow Vocabulary
- **Hover glow** (`box-shadow: 0 20px 40px rgba(154, 112, 245, 0.15)`): Project/Uses card hover — the primary "this responded to you" signal.
- **Bright accent glow** (`shadow-bright-purple/50`): About's tech-stack tiles on hover.
- **CTA glow** (`hover:shadow-lg hover:shadow-[#9A70F5]/25`): Live Demo button hover.

### Named Rules
**The Gravitational Rule.** Surfaces are flat and matte at rest. Purple glow and lift appear only as a direct response to hover or focus — nothing in this system announces itself until it's touched, exactly like the `MagneticButton` component physically pulling icons toward the cursor.

**The Glitch.** A brief purple/Signal-Green chromatic-split echo (two 1-2px offset colored shadows plus a 1px jitter), signature to this system's HUD chrome. On `HudChrome`'s four fixed corner brackets it fires ambiently — a short flicker roughly every 7s, staggered per corner so the four never glitch in sync, reading as independent sensor noise rather than a single repeating beat. On `Card`'s target-lock corners it fires exactly once, on hover, as part of the lock-on: `opacity: 0.3` at rest → glitch flash → settles to a solid bright bracket. Never applied to text or fills, only to the corner-bracket motif, and never on more than one component family's corners without reason.

## Shapes

Three shape languages coexist, each doing a distinct job. Fully-pill (`rounded-full`) marks the site's *persistent* controls — the nav capsule, the mobile menu button, filter chips — things that are always present, always available. Sharp, unrounded corners (`0px`) mark *action* buttons — View Resume, Github, Live Demo — a deliberate contrast against the pill language: a button you press to do something reads as an instrument control, not a soft marketing affordance. `rounded-2xl` (16px) is for anything you read (project/uses/tech cards); `rounded-3xl` appears on the gallery's floating filter bar. Borders are hairline and low-opacity (`border-[#454545]/50`, `border-white/30`) rather than solid frames — they separate glass from void without competing with it.

The About section's own panels (`cardClasses`/`barClasses` in `About.jsx`) are a third, explicit exception: sharp, unrounded corners rather than `rounded-2xl`, referenced directly against `inspo/components.jpg`'s flat instrument-panel bars. This marks About as a dashboard/telemetry composition, distinct from the rounded-2xl reading-cards on Projects/Uses/Gallery — a deliberate departure, not drift. Interactive pills *inside* About (the Education/Experience tab selector) stay `rounded-full`, per the rule below — the panel shell went sharp, the persistent control inside it didn't. About's borders also went nearly invisible (`border-white/10`, down from a visible `border-[#9A70F5]/40`) — definition comes from background/blur contrast, not a drawn edge, matching `components.jpg`'s barely-there panel lines. The profile info, Github, and LinkedIn — three separate gapped boxes before — are now one continuous bar (`barClasses`) with thin internal dividers (`border-white/10`), directly echoing `components.jpg`'s single unified nav bar rather than a row of discrete cards.

### Named Rules
**The Pill-or-Sharp Rule.** A control is either fully-pill (persistent, always visible — nav, filter chips, tab selectors) or fully square-cornered (an action you take once, or a dashboard-style panel referencing `inspo/components.jpg` — action buttons, the About shell). Nothing in between — no `rounded-md`, no `rounded-lg`. The two shape languages should never blur into each other, and a panel's shell shape doesn't dictate the shape of persistent controls living inside it.

## Components

### Bracket Buttons (signature component)
Replaced the earlier pill/gradient buttons system-wide, directly modeled on `inspo/button style.jpg`'s `[ START ]`-style terminal menu. `.btn-bracket` in `src/index.css`, used by `Button.jsx` (hero "View Resume") and `Card.jsx`'s "Github"/"Live Demo".
- **Shape:** Sharp corners (`0px`, see The Pill-or-Sharp Rule), transparent at rest.
- **Bracket glyphs:** `[` and `]` flank the label as `::before`/`::after` content, dim (40% opacity) at rest, brightening and nudging outward (`translateX(±3px)`) on hover — the interaction feedback that replaces the old `whileHover={{scale:1.02}}` bounce; this system doesn't scale on hover anymore, it opens.
- **Corner tick:** An 8px corner-bracket accent (top-left), reusing the same visual language as `Card`'s target-lock corners and `HudChrome`'s registration marks — invisible at rest, `opacity: 1` on hover. This is the detail that ties buttons into the rest of the corner-bracket motif.
- **`--primary`** (View Resume, Live Demo): solid off-white text at rest; hover fills the box solid Nebula Purple with white text and a Signal Green corner tick.
- **`--ghost`** (Github): solid Nebula Purple text at rest, transparent fill; hover adds a faint purple wash and a Nebula Purple corner tick.
- Flat, solid color only — no gradient fill (see The Flat Rule).

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px), with an extra `rounded-bl-2xl` accent on project/uses cards.
- **Background:** Low-opacity gradient over Surface Charcoal (`from-[#9A70F5]/20 to-transparent` on project/uses cards; `from-[#1a1a1a]/80 via-[#2a2a2a]/60` on the default variant), always translucent over the void — never opaque.
- **Shadow Strategy:** Flat at rest; see Elevation & Depth's Gravitational Rule.
- **Border:** Hairline `border-[#454545]/50`.
- **Internal Padding:** 24px (`p-6`).
- **Target-lock corners:** Two 14px purple corner brackets (top-left, bottom-right), faint (`opacity: 0.3`) at rest, glitching to a solid bright bracket on hover — see The Glitch.
- **Category tag:** An optional Micro-label badge (top-right, Nebula Purple at 70% opacity) surfacing the item's real first category from Supabase data (`tool.categories[0]`) — factual metadata, not decoration.

### Navigation
- **Style:** Floating pill capsule, centered, `border-white/30` hairline, `backdrop-blur-xl`, fixed to viewport top.
- **Typography:** Label role, uppercase, `font-sub-head` (Exo 2).
- **States:** Default `text-neutral-300`; hover/active shift to Nebula Purple with a weight bump to bold — color and weight change together, not color alone.
- **Mobile:** Full-screen blurred takeover (`backdrop-blur-2xl` over `bg-black/50`) with giant (`text-8xl`) stacked uppercase links, not a slide-out drawer.

### Magnetic Button (signature component)
A physics-based wrapper (`framer-motion` spring, `mass: 0.1`) that lets icons and social links drift toward the cursor as it approaches, then spring back on mouse-leave. This is the system's most literal expression of its own North Star — content behaving as if pulled by a nearby gravity well — and should be reused for any new small interactive icon/CTA rather than reinvented.

### HUD Chrome (signature system layer)
A fixed, `pointer-events-none`, site-wide atmosphere layer (`HudChrome.jsx`) mounted once in `App.jsx`, sitting above the void/video (z-index 1) and below all real content and nav (z-index 2+): a 64px hairline purple grid (`rgba(154,112,245,0.05)`), a faint SVG-noise grain (`opacity 0.035`, `mix-blend-mode: overlay`), four 20px corner registration brackets that fade in staggered on mount and ambiently glitch (The Glitch, staggered per corner, ~every 7s), and two bottom-edge micro-metadata readouts — `Odisha, India` (bottom-left, factual) and a live `HH:MM:SS UTC` clock with a pulsing Signal Green status dot (bottom-right, factual and genuinely live, never a fabricated "online" claim). This is what makes the Event Horizon read as a persistent instrument, not just a hero decoration — inspired by mission-dossier / HUD poster references the user provided directly (grid overlays, corner reticles, tracked metadata, and terminal/glitch chrome are load-bearing parts of that reference set, not incidental).

### Page Header (signature component)
`PageHeader.jsx` — the tracked micro-label eyebrow (Nebula Purple, 75% opacity) plus a blur-in Display-role title, with a faint two-ring reticle (`rgba(154,112,245,0.12)` / `0.08`) centered behind it (`z-index: -1`, non-interactive). Used identically on Projects ("Project Log"), Uses ("Equipment Manifest"), Gallery ("Visual Archive"), and Tools ("System Status") so every non-Home page opens the same way. Home's hero keeps its own distinct treatment (the video, the gradient name) rather than adopting `PageHeader` — the hero is allowed to be the one unrepeated moment.

### Target-Lock Corners (card hover accent)
Two 14px purple corner brackets (top-left, bottom-right) on `Card.jsx`, `opacity: 0` at rest and `opacity: 1` on `group-hover` — a quieter, permanent version of the "computer interface" idea explored in live mode. Obeys the Gravitational Rule exactly: invisible until touched.

### Telemetry Readout (signature component, `TelemetryBlock.jsx`)
A small, dim (`rgba(234,234,234,0.3)`), Mono-role diagnostic paragraph, directly referencing an IBM 1401 Autocoder assembly listing the user provided. `TelemetryBlock` is a shared, presentational component (`lines: [label, value][]`) with two distinct instances, each with different content and placement — never the same lines twice, to avoid ever reading as duplicated text if both happened to be visible at once:
- **Hero** (`.hero-telemetry`, top-left, `Home.jsx`): viewport dimensions, IANA timezone, origin, render stack.
- **About** (inline, no positioning modifier — rendered in normal flow): embedded directly inside the profile bar's trailing `flex-1` cell, filling what used to be dead space after the Github/LinkedIn icons rather than floating in a separate corner. Shows only `SYS.PAGE ABOUT.ME` and the real tech-stack module count — deliberately not repeating hero's viewport/timezone/origin/render lines.

Every line is real, live data read from the browser at render time, never invented copy. `SYS.*`-prefixed labels use a dim Nebula Purple; values stay dim off-white. `aria-hidden="true"` (decorative telemetry, not content) and `hidden lg:block` (desktop-only — there's no room once layouts stack on mobile). This is the HUD-chrome-must-be-factual doctrine applied to its most literal, densest expression yet.

### Named Rules
**No Repeated Telemetry.** Every `TelemetryBlock` instance on a page must show content none of the others show. If two could ever be on-screen together, identical lines would read as a bug, not atmosphere.

On `#hero`, the block additionally carries a scroll-linked lag: `useScroll()` + `useTransform(scrollYProgress, [0,1], [0,140])` drives its `y`, on top of its normal in-flow scroll movement — it's an `absolute`-positioned child of `#hero` (not `fixed`), so it scrolls away with the hero naturally, just arriving late, reading as a HUD overlay that hasn't quite caught up with the page. Same `useScroll` pattern `VideoBg.jsx` already uses for its scale/opacity hero effect — no new scroll-tracking mechanism introduced.

## Do's and Don'ts

### Do:
- **Do** use full pill shape (`rounded-full`) for persistent controls — nav, filter chips.
- **Do** use sharp, unrounded corners for action buttons — View Resume, Github, Live Demo (**The Pill-or-Sharp Rule**).
- **Do** use `rounded-2xl` for anything readable — cards, panels.
- **Do** keep surfaces flat and matte at rest; let hover/focus summon glow and lift (**The Gravitational Rule**).
- **Do** keep Signal Green exclusive to verified achievement metrics, as flat solid color (**The Rare Signal Rule**).
- **Do** pair Orbitron (announces) with Exo 2 (reads) and nothing else (**The Two-Voice Rule**).
- **Do** give every new page a `PageHeader` (eyebrow + title + reticle) instead of a one-off `<h1>` — cohesion across pages depends on reusing it, not restyling it per page.
- **Do** keep HUD chrome (grid, grain, corner brackets, metadata) factual or purely atmospheric — the live clock is real time, the location is real; never dress up a fabricated status claim as chrome.
- **Do** keep IBM Plex Mono scoped to genuine measurement/telemetry data only (**The Two-Voice Rule**'s narrow exception) — never a heading, never body copy.

### Don't:
- **Don't** add a resting `box-shadow` for structural elevation — this system has none; depth is glow-on-interaction only.
- **Don't** introduce a third accent hue. The palette is void + off-white + one purple in general use + one green held in reserve.
- **Don't** use italic type anywhere — the codebase uses none, on either family.
- **Don't** make a card or panel background opaque — surfaces stay translucent over the void, or the black-hole read collapses into an ordinary dark theme.
- **Don't** fill text or a button with a gradient — solid color only (**The Flat Rule**). The only gradients left are card glass-panel tints and the loader's progress fill.
- **Don't** round the corners of an action button, or leave a persistent control's corners sharp — the two shape languages don't mix (**The Pill-or-Sharp Rule**).
- **Don't** invent or embellish a telemetry/diagnostic value — every `.telemetry-block` line must read from real browser/session state, or it doesn't ship.
