---
title: BIC System State — 2026-09-24
date: 2026-09-24
tags: [status, architecture, next-steps]
aliases: [BIC State Sep 2026]
---

# Brothers In Christ — System State & Next Steps
*Last updated: 24 September 2026*

> [!QUOTE] "As iron sharpens iron, so one man sharpens another." — Proverbs 27:17

---

## 1. What Has Been Built

### Tech Stack
| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | `^16.3.0` |
| UI | React | `19.0.0` |
| Language | TypeScript | `5.8.2` |
| Styling | Tailwind CSS | `^4.3.3` |
| ORM | Prisma | `^6.4.1` |
| Database | PostgreSQL (Supabase-compatible) | — |
| State | Zustand | `^5.0.15` |
| Validation | Zod | `3.24.2` |

---

### 1.1 Route Structure (fully scaffolded)

```
/                          → Public landing page + hero carousel
/merch                     → Merch showcase
/signin                    → Role-based demo sign-in
/signup                    → New brother onboarding form
/forgot-password           → Password recovery flow

/portal/dashboard          → Member dashboard (KPIs, scripture anchor, group preview)
/portal/levels             → 5-stage formation ladder
/portal/circle             → Small group / prayer wall
/portal/check-in           → Multi-step weekly check-in wizard
/portal/devotions          → Daily devotion entries
/portal/attendance         → Gathering attendance log
/portal/profile            → Personal testimony & goals form

/leadership/overview       → Leadership console (flagged brothers, circle health)
```

### 1.2 Database Schema (Prisma — 7 Domains)

| Domain | Models |
|---|---|
| **Identity** | `User`, `Profile`, `JourneyStageHistory` |
| **Discipleship** | `Level`, `DailyPractice`, `CheckIn`, `ReadingPlan`, `Devotion` |
| **Community** | `Group`, `GroupMember`, `AccountabilityPartner` |
| **Engagement** | `Event`, `Attendance` |
| **Growth** | `GrowthScore` |
| **Leadership** | `LeaderReport`, `LevelReview` |
| **Schema Mgmt** | `MigrationLog` |
| **Lookup Tables** | `Role`, `JourneyStage`, `GroupRole`, `ReviewStatus`, `AttendanceStatus` |

All lookup table IDs are gap-spaced integers (10, 20, 30…) for safe insertion without renumbering.

### 1.3 Member Journey — Fully Mapped in Schema

The 10-stage funnel from the diagram is fully modelled:

```
10 Visitor → 20 Create Profile → 30 Join BIC → 40 Assign Level →
50 Assign Small Group → 60 Assign Accountability Partner →
70 Daily Practices → 80 Weekly Check-In → 90 Leader Review → 100 Growth Score
```

Every stage transition is optionally logged to `JourneyStageHistory` for funnel reporting.

### 1.4 Formation Levels (Seeded)

| Level | Title | Description |
|---|---|---|
| 1 | New Believers | Foundations in prayer, Scripture, brotherhood, surrender |
| 2 | Rooted | Daily spiritual consistency, Scripture literacy |
| 3 | Steady | Reliability, spiritual maturity, reproducible habits |
| 4 | Serving | Serving, influencing, carrying spiritual culture |
| 5 | Leaders | Mature oversight, prayer, forming other men |

### 1.5 API Routes (Live)

| Route | Method | Purpose |
|---|---|---|
| `/api/auth/signin` | POST | Session sign-in |
| `/api/auth/signup` | POST | New member registration |
| `/api/members` | GET/POST | Member management |
| `/api/groups` | GET/POST | Group management |
| `/api/check-ins` | GET/POST | Weekly check-in submission |

### 1.6 Component Inventory

**Shell & Navigation**
- `PortalShell` — authenticated member portal layout (sidebar + topbar + mobile nav)
- `LandingNav` — public marketing navbar
- `BrandMark` — BIC circular emblem (compact / full)
- ~~`AppShell`~~ — **deprecated**, to be removed (see §2)

**Animation & Motion**
- `BlurFade`, `BlurFadeText` — entry transitions, staggered hero typography
- `ScrollReveal` — intersection observer entrance animations
- `HeroCarousel` — auto-advancing hero, respects `prefers-reduced-motion`

**Auth & Access Control**
- `SessionProvider` — demo auth context with `localStorage` sync
- `AuthGate`, `LeaderGate`, `AdminGate` — route protection
- `SignInForm`, `SignUpForm` — demo auth forms

**Data & Status Cards**
- `MetricCard` — single metric (`.data-label` / `.data-value` / `.data-detail`)
- `ProgressCard` — progress readout with animated bar
- `SectionHeader` — flat, organizational — **not a card**

**State Stores (`src/stores/`)**
- `auth-store.ts` — active persona, roles, persona switcher
- `checkin-store.ts` — multi-step wizard state
- `ui-store.ts` — sidebar, drawers, modal visibility

### 1.7 Design System Summary

> See [[design.md]] for the full token reference.

| Token | Value | Role |
|---|---|---|
| `--gold` | `#b68b35` | Primary action / active state only |
| `--accent` | `#1f7a68` | Positive/healthy status only — never CTA |
| `--background` | `#e9edf3` | Canvas background |
| `--surface-strong` | `#162033` | Hero / spotlight cards |
| `--shadow` | neumorphic dual-cast | True cards only |
| `--radius` | `26px` | Cards & floating surfaces |
| `--radius-flat` | `0px` | Sections — no shadow, no radius |

**Card vs. Section rule:** a card is a discrete, repeatable, removable object. A section is a one-off page chunk. Both consoles share the same rule — no exceptions.

---

## 2. Known Issues / Outstanding Gaps

> [!WARNING] Auth is still demo-only
> `SessionProvider` + `localStorage` is the current auth layer. The Prisma schema and API routes are ready, but **JWT/session auth is not yet wired** into the portal shell or API middleware. Real authentication is the single biggest gap before production use.

> [!CAUTION] `AppShell` is deprecated but not removed
> `components/app-shell.tsx` duplicates `PortalShell`'s responsibility. Any screen still using it must be migrated and the file deleted.

| # | Issue | Priority |
|---|---|---|
| 1 | Real auth not wired (JWT / Supabase sessions) | 🔴 Critical |
| 2 | `AppShell` deprecated, not yet removed | 🟡 High |
| 3 | No admin panel / member management UI | 🟡 High |
| 4 | Growth Score calculation not automated | 🟡 High |
| 5 | Leadership console is a single overview page only | 🟡 High |
| 6 | No email / notification system | 🟠 Medium |
| 7 | No PWA / push notification support | 🟠 Medium |
| 8 | No journey stage auto-advance logic | 🟠 Medium |
| 9 | Check-in wizard not persisted to DB | 🟠 Medium |
| 10 | `ensure-db.ts` script — review for prod safety | 🟠 Medium |
| 11 | Seed is destructive (wipes all data) — need a safe re-seed | 🟠 Medium |
| 12 | No role-based redirect after sign-in | 🟢 Low |
| 13 | Merch page is a static placeholder | 🟢 Low |

---

## 3. Next Steps

### 🔴 Immediate — Wire Real Authentication

1. Implement proper password hashing at the API layer (currently `hashPassword` exists in `src/lib/auth-server.ts` — verify it's bcrypt, not a weak hash).
2. Add JWT session creation in `/api/auth/signin`.
3. Replace `SessionProvider` + `localStorage` with server-validated sessions (e.g. `iron-session` or NextAuth with Credentials provider).
4. Protect all `/portal/*` and `/leadership/*` routes with middleware (`src/middleware.ts`).

### 🟡 Near-Term — Leadership Console Completion

- Expand `/leadership/overview` into at minimum:
  - **Member oversight table** — list all members, filter by journey stage, role, level
  - **Flagged brothers queue** — members with low check-in consistency or flags
  - **Circle health readouts** — per-group summary cards
  - **Level review queue** — pending `LevelReview` rows for approval/rejection

### 🟡 Near-Term — Admin Member Management

- Build an admin-only section (`/admin/*` or within `/leadership`) for:
  - Assigning levels (`User.currentLevelId`)
  - Assigning small groups (`GroupMember`)
  - Assigning accountability partners (`AccountabilityPartner`)
  - Advancing journey stage (`User.journeyStageId` + logging `JourneyStageHistory`)

### 🟡 Near-Term — Growth Score Engine

- Write a server action / cron job that recalculates `GrowthScore` for a user based on:
  - Prayer days / Bible days from recent `CheckIn` rows
  - `Attendance` records in the last 30 days
  - `AccountabilityPartner.metAccountability` frequency
  - `DailyPractice` streaks

### 🟠 Medium — Wiring Check-In to Database

- The check-in wizard (`/portal/check-in`) currently uses Zustand local state only.
- Wire `POST /api/check-ins` to the wizard's submit step.
- Display past submissions on the same page using `GET /api/check-ins`.

### 🟠 Medium — Journey Stage Auto-Advance

- After key milestones (profile created, group assigned, partner assigned, first check-in submitted), automatically advance `User.journeyStageId` and log to `JourneyStageHistory`.
- This is the data backbone for the funnel diagram.

### 🟠 Medium — Notification / Accountability System

- Weekly check-in reminder (email or browser push)
- Leader alert when a member misses 2+ check-ins
- Accountability partner nudges

### 🟢 Later — PWA / Mobile

- Add `manifest.json` and service worker for installable PWA.
- Review mobile nav for offline-first UX.

---

## 4. Architecture Notes for Reference

```
Member Journey Diagram (from Napkin visual)
┌──────────┐   ┌──────────────┐   ┌────────────────┐   ┌─────────────────┐   ┌──────────────┐   ┌──────────────┐
│ Visitor  │→  │ Create       │→  │ Assign Small   │→  │ Daily           │→  │ Leader       │→  │ Growth       │
│          │   │ Profile      │   │ Group          │   │ Practices       │   │ Review       │   │ Score        │
└──────────┘   └──────────────┘   └────────────────┘   └─────────────────┘   └──────────────┘   └──────────────┘
      ↓               ↓                   ↓                     ↓                    ↓
  Join BIC      Assign Level      Assign Acc.           Weekly Check-In
                                  Partner
```

**Key design constraint:** Gold = action, Green = status. Both consoles share this split with no exceptions. The leadership console does not get its own accent colour.

---

## 5. Related Files

- [[design.md]] — Full design system, token reference, component inventory
- `prisma/schema.prisma` — Complete database schema
- `prisma/seed.ts` — Database seed (super admin + levels + lookup tables)
- `src/components/portal/PortalShell.tsx` — Authenticated layout shell
- `src/stores/` — Zustand state stores
- `app/api/` — API route handlers
