# Brothers In Christ (BIC) — System Design & Architecture (`design.md`)

> **Discipleship Platform for Kingdom Men**  
> *"As iron sharpens iron, so one man sharpens another." — Proverbs 27:17*

---

## 1. Executive Summary & Design Vision

**Brothers In Christ (BIC)** is a mobile-first Christian men's discipleship web platform built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

This revision tightens three things that had drifted in the previous pass:

1. **Card discipline** — cards are reserved for discrete, repeatable objects, not used as a default wrapper for every section.
2. **Typographic hierarchy** — a defined data-type scale (value / label / detail) sits alongside the content heading scale, so importance is legible without relying on card elevation to do the work.
3. **Cross-portal consistency** — the Member Portal and Leadership Console share one set of rules for what an accent color means, so the two consoles read as one product, not two.

---

## 2. Design System & Style Tokens

### 2.1 Color Palette
Defined in `app/globals.css`:

| Token | CSS Variable | Hex / Value | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--background` | `#e9edf3` | Soft slate/stone neutral base |
| **Foreground / Text** | `--foreground` | `#17202f` | High-contrast dark charcoal for primary typography |
| **Surface Base** | `--surface` | `#e9edf3` | Matched to background for embossed neumorphic elements |
| **Surface Dark** | `--surface-strong` | `#162033` | Deep obsidian blue-gray for spotlight and hero cards |
| **Kingdom Gold** | `--gold` | `#b68b35` | Primary action / active state — the single "this is selected or actionable" signal |
| **Kingdom Accent** | `--accent` | `#1f7a68` | Positive/healthy status only — never used for "primary action" |
| **Kingdom Accent Dark**| `--accent-strong` | `#125444` | Solid emerald contrast for positive status indicators |
| **Muted Text** | `--muted` | `#5f6d80` | Secondary descriptions, timestamps, metadata labels |
| **Border Neutral** | `--border` | `rgba(119, 132, 154, 0.26)` | Subtle dividing lines and card definition |

**Accent rule (applies to both consoles, no exceptions):**
- **Gold** = primary action, active nav state, selected tab, "your thing to do." Used identically in the Member Portal and the Leadership Console.
- **Green** = positive/healthy status only (on-track streak, healthy circle, resolved flag). It is a status color, never a call-to-action color.
- Leadership does **not** get its own accent identity. It uses the same gold-for-action / green-for-status split as the member portal. The only thing that visually distinguishes Leadership is the sidebar label and route, not a different primary hue.

### 2.2 Elevation & Neumorphic Tactility — used sparingly, on purpose

Elevation is reserved for surfaces the user manipulates or scans as a set. It is **not** a default page-section wrapper.

- **Standard Card Shadow (`--shadow`)**:  
  `-10px -10px 22px rgba(255, 255, 255, 0.85), 10px 10px 24px rgba(136, 151, 172, 0.36)`  
  Used only on true card components (see §2.5).
- **Deep Card Shadow (`--shadow-strong`)**:  
  `-16px -16px 36px rgba(255, 255, 255, 0.9), 18px 18px 38px rgba(125, 141, 165, 0.42)`  
  Reserved for floating/overlay surfaces: modals, the check-in wizard step panel, toasts.
- **Pressed / Recessed Inset (`--shadow-inset`)**:  
  `inset -7px -7px 14px rgba(255, 255, 255, 0.86), inset 7px 7px 14px rgba(130, 146, 170, 0.32)`  
  Active button presses, inputs, selected nav states only.

### 2.3 Geometry & Radii
- **Primary Radius (`--radius`)**: `26px` — cards and floating surfaces only.
- **Secondary Radius (`--radius-sm`)**: `18px` — nested sub-cards, pills, mobile nav.
- **Pill / Circular Radius**: `999px` — buttons, status chips, avatar circles.
- **Section Radius (new — `--radius-flat`)**: `0px` / no radius, no shadow. Applied to plain sections (see §2.5). Sections are separated by spacing and a `--border` hairline, never by elevation.

### 2.4 Typography Hierarchy

Two parallel scales now exist: **content headings** (unchanged in purpose, used for page/section titles and prose) and **data type** (new, used for every metric, stat, and status readout). Mixing the two — e.g. running a heading style through a metric value — is what caused the "hierarchy all over the place" problem.

**Content headings**
- **Primary Font**: `Inter, "Helvetica Neue", Arial, sans-serif`
- `.heading-xl`: `clamp(2.35rem, 12vw, 5.2rem)` — Hero slogans only (marketing page).
- `.heading-lg`: `clamp(1.8rem, 7vw, 3rem)` — Page titles (one per screen, e.g. "Dashboard").
- `.heading-md`: `clamp(1.12rem, 3.5vw, 1.35rem)` — Section titles within a page (e.g. "Your Circle").
- `.eyebrow`: `0.72rem`, `letter-spacing: 0.12em`, uppercase, bold — category tags, verse citations, and reused as the data-label style below.

**Data type (new — use for every stat, metric, and status readout)**
- `.data-value`: `clamp(1.75rem, 5vw, 2.5rem)`, weight 700, tabular numerals, `--foreground`. The number itself — consistency %, streak count, days completed.
- `.data-label`: same as `.eyebrow` — `0.72rem`, uppercase, `letter-spacing: 0.12em`, `--muted`. What the value means, sits directly above or beside the value.
- `.data-detail`: `0.85rem`, weight 400, `--muted`. Trend/context line only ("up from last week"). Never bolded, never the same size as the label.

**Body / prose**
- `0.95–1rem`, weight 400, `--foreground`, line-height 1.6. Used for testimony text, devotion copy, form helper text. Does not borrow weight or size from either scale above — body copy should never compete with a data value or a heading for attention.

**Rule of three:** any given screen should use at most three type treatments from the two scales above, plus body copy. If a screen needs a fourth, that's a sign something should be demoted to `.data-detail` or removed rather than given its own new style.

### 2.5 Card vs. Section — the decision rule

Before wrapping anything in a card, ask: **does this represent a discrete, repeatable object, or is it a chunk of the page?**

**Use a card (`--shadow`, `--radius`) when the thing is:**
- Countable and would still make sense removed from its page — a single metric, a single circle member, a single devotion entry, a single flagged brother in the leadership queue, a single check-in log row.
- Something the user scans as a set (a grid or list of the same component repeated).
- Something interactive in isolation (tappable, selectable, has its own state).

**Use a plain section (`--radius-flat`, spacing + `--border` hairline, no shadow) when the thing is:**
- A one-off block that appears exactly once per page — a page header, the daily scripture anchor, a form, an intro paragraph, the check-in wizard's current step body.
- A wrapper whose only child is itself a card or a grid of cards. Don't double-elevate — if `MetricCard` already has a shadow, the grid container around it should be flat.
- Purely organizational (a `SectionHeader` groups content below it — it is not itself a discrete object and gets no shadow).

**Quick test:** delete the shadow and radius. Does it still make sense as a distinct unit? If yes, it's a card. If it just becomes an oddly-bordered paragraph or a section that happens to have rounded corners, it was never a card.

**Applies equally to both consoles.** The Leadership Console's flagged-brothers list, oversight queue, and circle-health readouts follow the same card/section split as the member portal — a flagged brother is a card (discrete, repeatable, actionable); the "Urgent Follow-Up" page header and intro copy above it is a section (one-off, organizational).

---

## 3. Layout Architecture

Four layout modes, unchanged in structure from the previous pass — the change is in what's card vs. section *within* each, not the shell itself.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RootLayout (app/layout.tsx)                     │
│               [ScrollReveal, SessionProvider, Global CSS]              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │   Public / Marketing  │  │  Authentication  │  │  Member Portal  │ │
│  │     (app/page.tsx)    │  │ (app/(auth)/*)   │  │ (app/portal/*)  │ │
│  │  - LandingNav         │  │ - AuthLayout     │  │ - PortalShell   │ │
│  │  - HeroCarousel       │  │ - BrandMark      │  │ - Fixed Sidebar │ │
│  │  - Mission Bands      │  │ - Centered Card  │  │ - Topbar + Info │ │
│  │  - LandingFooter      │  │                  │  │ - Bottom Nav    │ │
│  └───────────────────────┘  └──────────────────┘  └─────────────────┘ │
│                                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │             Leadership Console (app/leadership/*)                  │ │
│  │  - LeadershipLayout: same shell pattern as PortalShell,            │ │
│  │    same accent rules (§2.1), same card/section rules (§2.5)        │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Root Layout (`app/layout.tsx`)
- Global viewport and metadata configuration.
- Injects `ScrollReveal` for intersection observer animations.
- Injects `SessionProvider` for authentication state hydration.
- Suppresses client hydration warnings on `<body>`.

### 3.2 Public Marketing Layout (`app/page.tsx`, `app/merch/page.tsx`)
- **Header**: `LandingNav` — logo, desktop anchor links, CTA buttons, mobile drawer.
- **Hero**: `HeroCarousel` with `BlurFadeText` typographic overlays.
- **Content Bands**: Alternating `.landing-band` sections (flat, no shadow) — 3 pillars, 3-step formation path.
- **Footer**: 4-column footer with Proverbs 27:17 lockup and route shortcuts.

### 3.3 Auth Layout (`app/(auth)/layout.tsx`)
- Centered modal container (`.auth-shell` inside `.auth-page`) — this is the one legitimate "single card" exception, since the whole auth flow is a self-contained floating object over the canvas.
- Circular `BrandMark` emblem with gold-gradient backing.
- Hosts `SignInForm`, `SignUpForm`, forgot-password screens.

### 3.4 Member Portal Layout & Shell (`src/components/portal/PortalShell.tsx`)
- **Fixed Desktop Sidebar (`250px`)**: `BrandMark` (compact), nav list (Dashboard, Levels, My Circle, Check-in, Devotions, Attendance, Profile), conditional "Leader Portal" link, dev persona switcher, footer with user + sign out.
- **Main Content (`.app-main`)**: `250px` left offset on desktop, `0px` on mobile. Topbar: breadcrumbs, dynamic title/subtitle, formation level pill, consistency % badge — topbar itself is flat, not a card; the badges within it are small pill components.
- **Mobile Bottom Navigation (`.mobile-nav`)**: Fixed, blurred glass backdrop, 5 primary tabs.

**Dashboard composition (applying §2.5):**
- *Sections (flat)*: page header, daily scripture anchor block (one-off, full-width).
- *Cards*: the 4 KPI indicators (repeatable, each a discrete metric using `.data-value` / `.data-label` / `.data-detail`), small group preview, upcoming gathering preview.

### 3.5 Leadership Layout (`app/leadership/layout.tsx`)
- Same shell pattern as `PortalShell` — sidebar, topbar, content area — so the two consoles feel like one app.
- Nav focused on Oversight, Urgent Follow-Up Alerts, Circle Health.
- Uses the same gold-for-action / green-for-status accent split as the member portal (§2.1) — no separate "leadership green theme."
- Quick bidirectional switch between Leader View and Member View, styled as a standard pill toggle (not a card).

**Leadership dashboard composition:**
- *Sections (flat)*: page header, "Urgent Follow-Up" intro copy.
- *Cards*: each flagged brother (repeatable, discrete, actionable), each circle-health readout (repeatable).

---

## 4. Component Inventory & Breakdown

### 4.1 Shell & Navigation Components

| Component | File Path | Props & Signature | Purpose |
| :--- | :--- | :--- | :--- |
| **`PortalShell`** | `src/components/portal/PortalShell.tsx` | `{ children, title, subtitle? }` | Core layout shell for all authenticated member pages. |
| **`LandingNav`** | `components/landing-nav.tsx` | `()` | Public marketing top navbar. |
| **`BrandMark`** | `components/brand-mark.tsx` | `{ compact?: boolean }` | BIC circular emblem. |

> **Note:** `AppShell` (`components/app-shell.tsx`) is deprecated. It duplicated `PortalShell`'s responsibility as a "standalone session-based shell for legacy views" — that fork is what let the two consoles drift apart visually in the first place. Migrate any remaining screens using `AppShell` to `PortalShell` and remove it.

### 4.2 Animation & Motion Components

| Component | File Path | Props & Signature | Purpose |
| :--- | :--- | :--- | :--- |
| **`BlurFade`** | `components/blur-fade.tsx` | `{ children, duration?, delay?, yOffset?, inView?, blur? }` | Entry transition: opacity, blur, upward translation. |
| **`BlurFadeText`** | `components/blur-fade-text.tsx` | `{ text, as?, delay?, stagger?, duration?, yOffset?, blur? }` | Staggered blur-fade for hero slogans. |
| **`ScrollReveal`** | `components/scroll-reveal.tsx` | `()` | Observer binding entrance animation to `.card`, `.metric`. |
| **`HeroCarousel`** | `components/hero-carousel.tsx` | `{ children?: ReactNode }` | Auto-advancing hero imagery, respects `prefers-reduced-motion`. |

### 4.3 Auth & Access Control Components

| Component | File Path | Props & Signature | Purpose |
| :--- | :--- | :--- | :--- |
| **`SessionProvider`** | `components/session-provider.tsx` | `{ children: ReactNode }` | Demo auth context, `localStorage` sync. |
| **`AuthGate`** | `components/auth-gate.tsx` | `{ children: ReactNode }` | Redirects unauthenticated users to `/signin`. |
| **`LeaderGate`** | `components/auth-gate.tsx` | `{ children: ReactNode }` | Restricts to group/level leaders and admins. |
| **`AdminGate`** | `components/auth-gate.tsx` | `{ children: ReactNode }` | Admin-only enforcement. |
| **`SignInForm`** / **`SignUpForm`** | `components/auth-forms.tsx` | `()` | Demo sign-in / onboarding forms. |

### 4.4 Data & Status Card Components

| Component | File Path | Props & Signature | Purpose |
| :--- | :--- | :--- | :--- |
| **`MetricCard`** | `components/cards.tsx` | `{ label, value, detail, tone? }` | Single metric using `.data-label` / `.data-value` / `.data-detail`. Card — repeatable and discrete. |
| **`ProgressCard`** | `components/cards.tsx` | `{ label, value, target, tone }` | Single progress readout with animated bar. Card. |
| **`SectionHeader`** | `components/cards.tsx` | `{ eyebrow?, title, body? }` | Organizational header. **Not a card** — renders flat, no shadow, no radius; uses `.eyebrow` + `.heading-md`. |

---

## 5. Screen & Feature Route Map

```
/
├── (Marketing)
│   ├── / ............................ Public Landing Page
│   └── /merch ....................... Merch Showcase
│
├── (Auth)
│   ├── /signin ...................... Role-based Demo Sign-In Form
│   ├── /signup ...................... New Brother Onboarding Form
│   └── /forgot-password ............. Password recovery flow
│
├── /portal (Member Console)
│   ├── /dashboard ................... Section: scripture anchor · Cards: 4 KPI, group, gathering
│   ├── /levels ...................... Section: page intro · Cards: 5-stage ladder items
│   ├── /circle ...................... Section: page header · Cards: prayer wall entries, brother card
│   ├── /check-in .................... Section: wizard step body (elevated, floating) · Cards: submission log rows
│   ├── /devotions ................... Section: page header · Cards: devotion entries
│   ├── /attendance .................. Section: page header · Cards: gathering log entries
│   └── /profile ..................... Section: testimony/goals form · Cards: none (single-instance content)
│
└── /leadership (Oversight Console)
    └── /overview .................... Section: page header/intro · Cards: flagged brothers, circle health
```

---

## 6. State Architecture

1. **Zustand Stores (`src/stores/`)**:
   - `auth-store.ts`: active persona, roles (`MEMBER`, `GROUP_LEADER`, `LEVEL_LEADER`, `ADMIN`), persona switching.
   - `checkin-store.ts`: multi-step wizard state (`currentStep`, `prayerDays`, `bibleDays`, `flags`, `submitSuccess`).
   - `ui-store.ts`: sidebar visibility, mobile drawers, modal state.
2. **Context Layer (`components/session-provider.tsx`)**: syncs demo auth with `localStorage`.
3. **Database Layer (`prisma/schema.prisma`)**: PostgreSQL / Prisma domain schema — `User`, `Profile`, `Level`, `Group`, `GroupMember`, `CheckIn`, `Attendance`, `Devotion`, `PrayerRequest`, `LeaderReport`.

> Current implementation runs on demo auth + `localStorage`; the Prisma schema above is the target persistence layer, not yet wired in. Flag this explicitly to avoid the doc implying a live database where there isn't one yet.
