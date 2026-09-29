@AGENTS.md

# IEEE Week — Repository Rules

Official public website for IEEE Week, a multi-event series co-organized by
several IEEE societies within the IEEE CHRIST University Student Branch
Chapter. See `docs/ARCHITECTURE.md` for the full technical write-up.

## Package manager

- This project uses **Bun**. Never use `npm` or `npx`.
- Use `bun install`, `bun add`, `bun run`, `bun test`, `bunx` (only if a
  one-off binary is truly needed), etc.
- Do not introduce npm/yarn/pnpm lockfiles (`package-lock.json`,
  `yarn.lock`, `pnpm-lock.yaml`). Only `bun.lock` is committed.

## Official organization name

Always write the organization name exactly as:

**"IEEE CHRIST University Student Branch Chapter"**

Never shorten or replace it with "IEEE Student Branch", "IEEE SB",
"IEEE CHRIST", or similar variants — in UI copy, metadata, docs, or code
comments.

## Content accuracy

Never invent official event information, speakers, sponsors, venues,
statistics, contact details, or organizational claims. When information
is unavailable, use clearly marked placeholders or configurable fields
instead of made-up values.

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

`DESIGN.md` and the existing design-system implementation (`components/ui`,
`app/globals.css`, `app/design-system`) are the visual source of truth.
Installed design/UI skills may be used when useful, but must not create a
competing design system. Reuse existing components before creating new ones.

## Motion

Motion follows `docs/MOTION.md`. Use the primitives in `components/motion`
and the tokens in `lib/motion/tokens.ts`; never hardcode durations, easings,
distances or springs, and never hardcode the event-series name (use
`SERIES_NAME` from `lib/site/config.ts`). Honour reduced motion and touch.

## Engineering rules

- Server Components by default. Add `"use client"` only when a component
  needs interactivity, state, or browser-only APIs.
- Follow the existing Next.js App Router architecture.
- Strict TypeScript; avoid `any`.
- Keep components small and single-purpose; don't duplicate UI logic or
  components. Avoid unnecessary dependencies.
- Keep UI independent from MongoDB: components consume typed data models
  (`types/`) supplied through a data-access layer (`lib/`), never DB
  clients or raw documents.
- Don't hardcode event/society/speaker data into components — it will be
  sourced from MongoDB once that integration lands (see
  `docs/ARCHITECTURE.md`).
- MongoDB connection, Google Sheets sync, authentication, and the admin
  dashboard are intentionally not implemented yet — don't add them
  speculatively.

## Commands

```bash
bun run dev           # start dev server
bun run build         # production build
bun run lint          # eslint
bun run typecheck     # tsc --noEmit
bun run format        # prettier --write
bun run format:check  # prettier --check
bun test              # tests (when present)
```

## Validation

Use Bun for linting, typechecking, testing and builds. Run the relevant
validation commands (`lint`, `typecheck`, `build`, plus `test` when tests
exist) before considering any change done.

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

## DESIGN SYSTEM AND VISUAL AUTHORITY

The IEEE brand guidelines and approved IEEE color system are the
highest authority for branding and color decisions.

The project's IEEE Week design tokens and existing design-system
implementation are the source of truth for applying those colors
and related visual tokens in the application.

DESIGN.md is a supporting visual-design reference for:

- typography
- layout
- spacing
- composition
- hierarchy
- interaction patterns
- responsive design
- visual polish

DESIGN.md must NOT override the IEEE brand palette, IEEE brand
guidelines, or the project's established color tokens.

If DESIGN.md contains colors, themes, or examples originating from
another design system, treat those as generic design guidance only
and do not import those colors into the IEEE Week project.

Use the installed design/UI skills for design exploration and
refinement, but they must not override the IEEE brand guidelines
or established IEEE Week design tokens.

Priority:

IEEE brand guidelines
↓
IEEE Week design tokens
↓
Existing IEEE Week components
↓
DESIGN.md
↓
Installed design skills

Do not introduce a competing visual language.
