# Architecture

Status: **foundation phase**. This document describes what exists today and
the integration points planned for subsequent phases. It is not a spec for
unbuilt features.

## Technology choices

| Concern               | Choice                               | Why                                                                                                                                                                      |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework             | Next.js (App Router)                 | Server Components by default, file-based routing matches the events/schedule/registration route shape, first-class TypeScript support.                                   |
| Language              | TypeScript (strict)                  | Event, society, speaker and registration data all benefit from static shape guarantees, especially once MongoDB and Google Sheets are both writing into the same models. |
| Styling               | Tailwind CSS v4 (CSS-first `@theme`) | Token-driven styling without a separate JS config file; design tokens live next to the CSS they generate utilities for.                                                  |
| Validation            | Zod                                  | Single source of truth for form validation (React Hook Form resolvers) and, later, for validating documents at the MongoDB/Google Sheets boundary.                       |
| Forms                 | React Hook Form                      | Uncontrolled-by-default form state, pairs directly with Zod resolvers for the future registration flow.                                                                  |
| Icons                 | Lucide React                         | Tree-shakeable, consistent stroke-based icon set.                                                                                                                        |
| Persistence (planned) | MongoDB                              | See "Future MongoDB integration" below.                                                                                                                                  |
| Sync (planned)        | Google Sheets                        | See "Future Google Sheets integration" below.                                                                                                                            |

No client-side state-management library is installed. Server Components,
URL state, and local component state cover everything built so far; add a
library only when a concrete requirement can't be met without one.

## Directory structure

```
app/
├── layout.tsx              # root layout, fonts, metadata
├── page.tsx                # design-system showcase (temporary — see below)
├── globals.css             # design tokens + base styles
├── events/
│   ├── page.tsx             # event discovery (placeholder)
│   └── [slug]/page.tsx      # event detail (placeholder)
└── register/
    └── [eventId]/page.tsx   # registration (placeholder)

components/
├── ui/                      # generic primitives: Button, IconButton,
│                             # Heading, Text, Badge, Container
├── navigation/               # header/footer/nav composition (not yet built)
├── events/                   # event cards, filters, listings (not yet built)
├── registration/             # registration forms (not yet built)
└── sections/                  # homepage/marketing sections (not yet built)

lib/
├── db/                       # MongoDB client + data access (not yet built)
├── events/                   # event business logic (not yet built)
├── registrations/            # registration business logic (not yet built)
├── validation/                # Zod schemas (not yet built)
└── utils.ts                   # small shared helpers (e.g. `cn`)

types/                         # shared TypeScript types (not yet populated)
public/
├── images/
└── icons/
docs/
└── ARCHITECTURE.md
```

Empty directories are checked in with a `.gitkeep` so the intended shape is
visible before each area is filled in.

## Design-system architecture

### Token source of truth

All tokens live in `app/globals.css`, using Tailwind v4's CSS-first
`@theme` configuration — no `tailwind.config.ts`. The file has three parts:

1. **Raw palette** (`:root`) — the actual IEEE brand hex values plus a
   blue-tinted neutral scale and status colors, none of which should be
   referenced directly from components.
2. **Semantic tokens** (`:root`, overridden under
   `@media (prefers-color-scheme: dark)`) — `--color-brand-*`,
   `--color-surface-*`, `--color-content-*`, `--color-border-*`,
   `--color-interactive-*`, `--color-status-*`, plus non-color tokens for
   radius, elevation (shadow) and motion (duration/easing).
3. **`@theme inline` block** — maps every semantic token into Tailwind's
   theme namespace so ordinary utility classes are generated:
   `bg-brand-primary`, `text-content-primary`, `border-border-focus`,
   `rounded-lg`, `shadow-medium`, `duration-emphasis`, etc.

Components must consume these utilities — never inline a hex value, an
arbitrary shadow, or a raw pixel radius.

**Naming note:** the semantic category the brief calls "text" is exposed as
`--color-content-*` / `text-content-*`, not `--color-text-*`. Tailwind
derives a utility's name from the theme key after `--color-`, so
`--color-text-primary` would generate the confusing `text-text-primary`
utility; `content` avoids that collision while remaining the same semantic
category ("text color on a surface").

### Typography

Two typefaces, loaded via `next/font/google` in `app/layout.tsx`:
**Manrope** for display/heading levels, **Inter** for body/label/caption.
Both are open-source substitutes chosen for a technical/professional tone
appropriate to an engineering student organization — IEEE has no single
mandated web typeface.

The type scale (display, heading-lg/md/sm, body-lg/body/body-sm, label,
caption) is implemented as component-layer utility classes
(`.text-display`, `.text-heading-lg`, ...) in `globals.css`, built from
`--font-size-*` / `--leading-*` / `--tracking-*` custom properties. These
are plain CSS classes in Tailwind's `components` layer, not Tailwind theme
keys — that keeps them below the `utilities` layer in cascade priority, so
a component can always override color/spacing with a normal utility class
(e.g. `<Text className="text-status-error">`).

### Spacing, layout, breakpoints

Spacing uses Tailwind v4's default 4px-based scale directly (`p-4` = 16px,
`gap-6` = 24px, ...) rather than a parallel token set — duplicating a scale
Tailwind already provides would just be another thing to keep in sync.
Breakpoints likewise use Tailwind's defaults (`sm`/`md`/`lg`/`xl`/`2xl`).
The one addition is `.container-page`, a component-layer class giving every
page a centered, max-width-1280px column with responsive side gutters
(16px → 24px → 32px); the `<Container>` component wraps it.

### Radius, elevation, motion

- Radius: `--radius-sm` (6px) through `--radius-xl` (16px), plus
  `--radius-pill` (9999px) — generates `rounded-sm` … `rounded-pill`.
- Elevation: `--shadow-subtle` / `-medium` / `-prominent`, each redefined
  (lower opacity, darker) under the dark-mode media query — generates
  `shadow-subtle` / `shadow-medium` / `shadow-prominent`.
- Motion: `--duration-fast` (120ms) / `-normal` (200ms) / `-emphasis`
  (320ms) with a single `--ease-standard` curve — generates
  `duration-fast` … `duration-emphasis` and `ease-standard`.

### Light / dark

Implemented via `@media (prefers-color-scheme: dark)` overriding the
semantic token values on `:root` — no JS theme toggle exists yet. Because
the semantic layer (not the raw palette) is what changes, components never
need dark-mode-specific classes; `bg-surface`, `text-content-primary`, etc.
resolve correctly in both themes automatically.

## Component conventions

- `components/ui/*` are generic primitives: no event/society/registration
  domain knowledge, fully driven by props and design tokens.
- Every component that supports both a semantic HTML tag and a visual style
  exposes them as two separate props (e.g. `Heading`'s `as` vs.
  `visualStyle`) so document structure and appearance can diverge when
  needed (a visually small `<h1>`, a visually large `<h3>`, etc.).
- Icon-only controls (`IconButton`) require `aria-label` at the type level —
  there is no way to render one without an accessible name.
- Class composition uses a small local `cn()` helper (`lib/utils.ts`)
  rather than adding `clsx`/`tailwind-merge` as dependencies; revisit if
  conditional-class logic gets meaningfully more complex.

## Current homepage

`app/page.tsx` is a **temporary design-system validation page**, not the
real IEEE Week homepage. It exists to prove the token architecture and
foundation components render correctly — color palette, type hierarchy,
buttons, badges, elevation/spacing, and responsive/dark behavior — before
any real content or layout work begins.

## Future MongoDB integration point

`lib/db/` is reserved for a singleton MongoDB client (the standard
Next.js pattern: cache the client on `globalThis` in development to survive
hot-reload without exhausting connections) and per-collection data-access
functions. `lib/events/`, `lib/registrations/` will contain the business
logic that calls into `lib/db/`, so route handlers and Server Components
never talk to the MongoDB driver directly. No connection code exists yet —
`MONGODB_URI` and friends are not yet referenced anywhere in the repo.

## Future Google Sheets integration point

Planned as a one-way sync driven from the registration write path: once a
registration document is persisted to MongoDB, a job (likely a route
handler or scheduled function) will append/update a row in a Google Sheet
via a service account, giving organizers a familiar, editable view of
registrations without exposing the database. This will live alongside
`lib/registrations/`, gated behind its own environment variables, and is
explicitly out of scope for the current foundation phase.
