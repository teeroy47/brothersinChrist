# Brothers In Christ

Mobile-first MVP scaffold for a structured Christian men's discipleship platform built with Next.js App Router and TypeScript.

## What is included

- Public landing page with BIC tone and ministry positioning
- Client-side demo authentication flow with role-aware access
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

## GitHub Pages deployment

This repo is refactored for static hosting with GitHub Pages.

- `next.config.ts` uses `output: "export"`
- auth is client-side demo state stored in `localStorage`
- protected routes are handled in the browser with client redirects
- the workflow in [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) builds and deploys the `out/` directory

The workflow sets:

```bash
NEXT_PUBLIC_BASE_PATH=/<repository-name>
```

That ensures links and assets resolve correctly on project pages such as:

```text
https://<user>.github.io/<repository-name>/
```

## MVP notes

- The current scaffold uses client-side demo auth and in-memory seeded data to make the flows inspectable immediately on static hosting.
- Production hardening should replace this with a real auth provider, database, persistence layer, audited admin actions, and a server-capable deployment target.
- The domain structure is already shaped for `User`, `Level`, `Group`, `AttendanceRecord`, `CheckInSubmission`, `Post`, `Notification`, and `LeaderReport`.
