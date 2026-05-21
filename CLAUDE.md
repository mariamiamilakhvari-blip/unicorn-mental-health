# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint via next lint
```

No test runner is configured.

## Environment Variables

Required in `.env.local`:

```
MONGODB_URI
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
APPLE_ID / APPLE_SECRET
STRIPE_SECRET_KEY
STRIPE_MONTHLY_PRICE_ID
STRIPE_YEARLY_PRICE_ID
NEXT_PUBLIC_APP_URL
```

## Architecture

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind + shadcn/Radix · Mongoose (MongoDB) · NextAuth v5 (beta) · Stripe · Firebase (FCM)

### Route Groups

| Group | Path | Purpose |
|-------|------|---------|
| `(auth)` | `/login`, `/signup`, `/forgot-password`, `/reset-password` | Unauthenticated flows |
| `(onboarding)` | `/questions`, `/permissions`, `/smartwatch` | Post-signup wizard |
| `(dashboard)` | `/home`, `/challenges`, `/hobbies`, `/profile`, `/subscription` | Authenticated app |

`app/page.tsx` is the public marketing/landing page.

### Auth

`auth.ts` (root) configures NextAuth with Credentials + Google + Apple providers. JWT strategy — `session.user.id` and `session.user.onboardingCompleted` are injected via callbacks. Type augmentations live in `types/next-auth.d.ts`.

**Auth split (important):** Onboarding pages and `app/page.tsx` use `lib/mock-auth.ts` — a localStorage stub (`unicorn_profile`, `unicorn_onboarded`, etc.) — instead of real NextAuth. The onboarding API route (`app/api/onboarding/route.ts`) uses real auth, but the onboarding UI pages are not yet wired to it. `middleware.ts` is intentionally empty — no route protection enforced yet.

All protected API routes call `auth()` from `@/auth`, check `session?.user?.id`, then call `connectDB()` before any Mongoose operation.

### Data Layer

`lib/db.ts` — singleton Mongoose connection cached on `global._mongoose` (Next.js dev HMR safe).

Models in `lib/models/`:
- `User` — central model; holds `profile` (14 onboarding answers), `permissions`, `subscription` (Stripe fields), `smartwatchProvider`
- `Challenge` — 21-day challenge per user; category is `social | business | relationships`; challenge titles/descriptions are hardcoded in `app/api/challenges/route.ts`, not in DB
- `Hobby` — 3-month hobby program with embedded `milestones[]` (stage, targetMonth, completedAt)
- `Notification` — per-user notification records

### Stripe

`app/api/stripe/checkout/route.ts` creates Checkout sessions for `monthly`/`yearly` plans using `STRIPE_MONTHLY_PRICE_ID` / `STRIPE_YEARLY_PRICE_ID`. No webhook handler exists — subscription status is not automatically updated after payment.

### UI

`components/ui/` — shadcn components (do not edit; re-generate via shadcn CLI if needed).

`components/dashboard/` — app-specific widgets: `CircleOfLife`, `HeatmapCalendar`, `MicroActionCard`, `MilestoneTracker`, `ProgressRing`, `SmartWatchBar`, `TopNav`, `BottomNav`, `CalendarWidget`.

Brand colors defined in `tailwind.config.ts`: `unicorn` (purple, primary — use `unicorn-500`/`unicorn-600` for actions) and `sage` (green, secondary). `animate-fade-in` available for page transitions.

`components/providers.tsx` is a no-op stub (SessionProvider not yet wired).

### Path Alias

`@/` maps to repo root (configured in `tsconfig.json`).
