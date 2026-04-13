# Brothers In Christ

Mobile-first MVP scaffold for a structured Christian men's discipleship platform built with Next.js App Router and TypeScript.

## What is included

- Public landing page with BIC tone and ministry positioning
- Demo authentication flow with role-aware access
- Mobile-first member experience for:
  - dashboard
  - levels
  - groups
  - community
  - weekly check-in
  - attendance
  - progress
  - profile
  - settings
- Leader space for follow-up and check-in review
- Admin space for assignments and system oversight
- Typed domain model and seeded data in [`lib/mock-data.ts`](./lib/mock-data.ts)

## Stack

- Next.js 15
- React 19
- TypeScript
- Zod

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`, then use the demo sign-in page to enter as a member, group leader, level leader, or admin.

## MVP notes

- The current scaffold uses cookie-based demo auth and in-memory seeded data to make the flows inspectable immediately.
- Production hardening should replace this with a real auth provider, database, persistence layer, form submission handlers, and audited admin actions.
- The domain structure is already shaped for `User`, `Level`, `Group`, `AttendanceRecord`, `CheckInSubmission`, `Post`, `Notification`, and `LeaderReport`.
