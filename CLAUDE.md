@AGENTS.md

# IEEE Week — Repository Rules

Official public website for IEEE Week, a multi-event series co-organized by
several IEEE societies within the university IEEE Student Branch. See
`docs/ARCHITECTURE.md` for the full technical write-up.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Zod + React Hook Form +
Lucide React + MongoDB driver. No state-management library — don't add one
without a concrete, current requirement.

## Design authority

Color and visual identity are governed, in order, by:

1. Official IEEE brand guidelines — primary blue `#00629B`, dark blue
   `#002855`, cyan `#00B5E2`, purple `#981D97`.
2. `DESIGN.md` at the repo root — **note:** this file documents Anthropic's
   own marketing-site design system (cream/coral editorial), not an IEEE
   system. Its _methodology_ (token categories, spacing/radius scale
   philosophy, elevation approach) informed this project's token
   architecture, but every color value was replaced with the IEEE palette.
   Do not pull Anthropic's coral/cream colors into this project.
3. Project design rules (this file + `app/globals.css` tokens).
4. Vercel web-design-guidelines skill.
5. Installed visual-design skills — never let a generic skill override the
   IEEE palette or invent a new visual identity.

All colors, spacing, radii, shadows and durations must come from the
semantic tokens defined in `app/globals.css` (`@theme inline` block). Never
hardcode a hex value, arbitrary pixel spacing, or ad-hoc shadow in a
component — extend the token set instead.

## Engineering rules

- Server Components by default. Add `"use client"` only when a component
  needs interactivity, state, or browser-only APIs.
- Strict TypeScript; avoid `any`.
- Keep components small and single-purpose; don't duplicate UI logic.
- Don't hardcode event/society/speaker data into components — it will be
  sourced from MongoDB once that integration lands (see
  `docs/ARCHITECTURE.md`).
- MongoDB connection, Google Sheets sync, authentication, and the admin
  dashboard are intentionally not implemented yet — don't add them
  speculatively.

## Commands

```bash
npm run dev          # start dev server
npm run build         # production build
npm run lint          # eslint
npm run typecheck     # tsc --noEmit
npm run format         # prettier --write
npm run format:check   # prettier --check
```

Run `lint`, `typecheck`, and `build` before considering a change done.

## Directory conventions

- `app/` — routes only. Route-specific composition lives in the route's
  `page.tsx`; shared UI lives in `components/`.
- `components/ui/` — generic, brand-token-driven primitives (Button,
  Badge, Heading, Text, Container, ...). No app-specific logic.
- `components/navigation`, `components/events`, `components/registration`,
  `components/sections` — feature/domain components, composed from
  `components/ui`.
- `lib/db`, `lib/events`, `lib/registrations`, `lib/validation` — server-side
  data access, business logic, and Zod schemas. Keep framework-agnostic
  where possible.
- `types/` — shared TypeScript types not colocated with a single feature.
