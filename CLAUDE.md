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

### Auth

`auth.ts` (root) configures NextAuth with Credentials + Google + Apple providers. JWT strategy — `session.user.id` and `session.user.onboardingCompleted` are injected via callbacks. Type augmentations live in `types/next-auth.d.ts`.

`lib/mock-auth.ts` is a **localStorage-based stub** used by onboarding pages (currently not wired to real auth). Onboarding writes profile answers to `localStorage` (`unicorn_profile`, `unicorn_onboarded`, etc.) rather than calling the API.

`middleware.ts` is intentionally empty — no route protection enforced yet.

### Data Layer

`lib/db.ts` — singleton Mongoose connection cached on `global._mongoose` (Next.js dev HMR safe).

All Mongoose models live in `lib/models/`:
- `User` — central model; holds `profile` (onboarding answers), `permissions`, `subscription`, `smartwatchProvider`
- `Challenge`, `Hobby`, `Notification` — per-user content models

API routes (`app/api/**`) always call `connectDB()` then operate on models directly. No ORM layer — raw Mongoose.

### Stripe

`app/api/stripe/checkout/route.ts` creates Checkout sessions for `monthly`/`yearly` plans using `STRIPE_MONTHLY_PRICE_ID` / `STRIPE_YEARLY_PRICE_ID`. No webhook handler exists yet — subscription status is not automatically updated after payment.

### UI

`components/ui/` — shadcn components (do not edit; re-generate via shadcn CLI if needed).

`components/dashboard/` — app-specific widgets (CircleOfLife, HeatmapCalendar, MicroActionCard, etc.).

Brand color scale: `unicorn` (purple, primary) and `sage` (green, secondary) — defined in `tailwind.config.ts`. Use `unicorn-500`/`unicorn-600` for primary actions.

`animate-fade-in` Tailwind class available for page transitions.

### Path Alias

`@/` maps to repo root (configured in `tsconfig.json`).
