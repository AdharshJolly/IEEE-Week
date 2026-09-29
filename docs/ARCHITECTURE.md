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

Full visual direction: bright, editorial, light-first. White canvas, quiet
IEEE tints, dark-blue type, saturated IEEE colours as signals.

### Token source of truth

All tokens live in `app/globals.css` (Tailwind v4 CSS-first, no
`tailwind.config`) in three layers:

1. **Brand**: official IEEE colours (`--brand-blue/dark/cyan/purple/orange/gray`)
   plus tints (`--tint-*`, brand colour mixed with white) and inks
   (`--ink-*`, brand colour mixed with dark blue, verified AA as text).
2. **Semantic**: `surface-*` (default, subtle, muted, brand, accent, special,
   highlight, elevated, deep, overlay), `content-*` (primary, secondary,
   tertiary, muted, brand, accent, on-brand, on-accent, on-deep),
   `line-*` (default, subtle, control, brand, on-deep), `interactive-*`,
   `status-*`, `cat-*` (event categories). `content` and `line` replace
   `text` and `border` to avoid Tailwind's `text-text-*` / `border-border-*`
   utility clashes.
3. **System**: type roles, radius hierarchy, elevation, motion, layout.

`@theme inline` resets Tailwind's default colours, radii and shadows, so
only tokens exist as utilities; a stray `bg-white` or `rounded-lg` does
nothing. Components never contain hex values.

There is no dark theme: the system is light-only (`color-scheme: light`).
Navy (`surface-deep`) is a deliberate, rare contrast moment.

### Typography

`next/font/google`: **Bricolage Grotesque** (display, headings), **Geist**
(body, UI), **Geist Mono** (metadata). No IEEE typeface guidance exists in
this repo (`DESIGN.md` is Anthropic's system), and IEEE mandates no web
typeface. Roles are `.type-display | hero | h1 | h2 | h3 | title | body-lg |
body | body-sm | label | eyebrow | caption | meta` in the components layer.

### Layout

`.container-page` (80rem, fluid gutter), `container-wide`, `container-narrow`;
`<Section tone spacing>` provides full-bleed bands with fluid vertical rhythm
(`py-section-sm|md|lg`).

### Shape, elevation, motion

- Radius: `tag` 4px, `control` 10px, `card` 18px, `panel` 32px, plus the
  signature `.shape-leaf` crop. `rounded-full` only for avatars and dots.
- Elevation: `rest`, `raised`, `overlay`, `float`, all tinted with dark blue.
- Motion: durations `instant/fast/base/slow/reveal`, easings `standard` and
  `emphasis`. Only transform and opacity animate. Load-in (`.rise-in`) and
  scroll reveal (`.reveal`, CSS scroll-driven) are disabled under
  `prefers-reduced-motion`.
- Decoration: `<Decor variant>` (dots, grid, rings, fields), always masked,
  tinted from the palette and `aria-hidden`.

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

`app/page.tsx` is a placeholder. The design system is demonstrated at
`/design-system`, a composition-only showcase (sections in
`app/design-system/_sections`, demo data in `fixtures.ts`).

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
