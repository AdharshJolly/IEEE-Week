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
├── template.tsx            # per-navigation page transition
├── page.tsx                # homepage
├── globals.css             # design tokens + base styles + motion CSS
├── about/  contact/  events/  events/[slug]/  register/  design-system/

components/
├── ui/                      # generic primitives (Button, Card, Heading, Decor, ...)
├── motion/                  # GSAP motion primitives (see docs/MOTION.md)
├── navigation/              # nav bar, footer, breadcrumbs, filters
├── events/                  # cards, timelines, event detail pieces, listing
├── sections/                # homepage/marketing sections
└── registration/            # reserved

lib/
├── db/                       # MongoDB client + data access (not yet built)
├── events/                   # event data access (mock data for now)
├── site/                     # config (series name), homepage copy, navigation
├── motion/                   # motion tokens
├── registrations/  validation/
└── utils.ts

types/  public/  docs/
```

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
- Motion: CSS tokens `--duration-*` / `--ease-*` plus the GSAP
  system documented in `docs/MOTION.md` (tokens in `lib/motion/tokens.ts`,
  primitives in `components/motion`). Only transform and opacity animate.
  Legacy CSS `.rise-in` / `.reveal` remain on some pages. Everything is
  disabled or reduced under `prefers-reduced-motion`.
- Decoration: `<Decor variant>` (dots, grid, rings, fields), always masked,
  tinted from the palette and `aria-hidden`.

### Visual language

SIGNAL = movement / connection (SignalLine, rules that draw).
GRID = engineering / structure (hairlines, indices, `SpecList`, 12-col layouts).
PIXEL = discovery / transformation (`PixelReveal`, see `docs/MOTION.md`).
BORDER = proximity / interaction / focus (`BorderGlow`, `components/effects`).
COUNTER = quantitative information that changes (`Counter`, `components/ui`;
see below).
GLASS = depth / layered interface (`GlassSurface`, `components/effects`; the
navbar is its canonical use, styles in `app/globals.css` `.glass-surface*`).

Structure comes from type, whitespace and rules before cards or shadows.
Editorial roles live in `app/globals.css`: `type-tech` (mono labels),
`type-index` (01, 02), `type-numeral` (dates), `type-row-title`. Events are
ruled rows (`EventRow`), societies an indexed rail, event detail a numbered
document with a `SpecList` spec sheet.

#### BorderGlow (BORDER primitive)

`components/effects/BorderGlow.tsx`, adapted from the React Bits component
(edge-proximity maths and layered cone masks kept; colours, radii, surfaces
and timing are project tokens; the intro sweep runs on GSAP). CSS lives in
`app/globals.css` (`.border-glow*`), defaults in `borderGlow` in
`lib/motion/tokens.ts`.

- **Purpose:** show that a single surface can be acted on, by lighting its
  edge from the side the pointer approaches.
- **Use it** on one featured or primary participation surface per view. Today:
  the featured event card on `/events` (`FeaturedEventCard glow`), the
  registration panel on an event page (only when a registration URL exists),
  and the `/design-system` showcase.
- **Do not use it** on lists of look-alike cards, every button, or the same
  element as `PixelReveal`, the cursor spotlight or the magnetic offset. Never
  as the only indicator of focus, selection or state.
- **Relationship:** SIGNAL leads toward an action, GRID structures the surface,
  PIXEL reveals a changed state, BORDER answers the pointer arriving.
- **Reduced motion:** no glow layers and no sweep; the plain surface stays.
- **Touch / coarse pointers:** glow layers are not rendered; pointer handling
  ignores non-mouse input. Nothing depends on hover.
- **Accessibility:** the effect is `aria-hidden` decoration. Interactive
  children keep the standard focus ring. Contrast comes from the surface
  tokens, not the glow.
- **Layout:** the outer glow overflows by `glowRadius`; place it where the
  parent has padding or does not clip.
- **Card:** `tone="bare"` gives a transparent Card (no hover lift, no
  spotlight) for use inside a BorderGlow.

#### Counter (COUNTER primitive)

`components/ui/Counter.tsx`, adapted from the React Bits Counter (per-place
digit columns, spring-driven rolling, arbitrary `places`, decimals and the
size/padding/gap/radius/colour/gradient props kept). It is rebuilt on GSAP
(the spring runs on the GSAP ticker, constants in `counter` in
`lib/motion/tokens.ts`), so no second animation library is added. Colours come
from the `tone` and `surface` props, which map to semantic tokens.

- **Purpose:** a data display primitive for a figure that changes while the
  person watches, so the change reads as a change.
- **Use it** where a quantity really changes: today the "Showing N of M events"
  count in `EventListing` and the homepage `CountdownTimer` (padded
  two-digit `places`; days grow as needed), and the `/design-system#counter` showcase.
- **Do not use it** for static figures (the homepage event/society/day counts
  are fixed per page load, so they stay plain `StatCard` text), decorative
  count-ups, dates, codes or IDs, or on the same element as PixelReveal,
  BorderGlow, spotlight or magnetic effects.
- **Reduced motion:** no roll; the value resolves immediately to the same layout.
- **Accessibility:** one visually-hidden text carries the value; the digits are
  `aria-hidden`. To announce changes, put a polite live region on the parent
  sentence (as `EventListing` does). Never duplicate the number elsewhere.
- **Sizing:** inherits the surrounding font size; digits are `1ch` wide with
  tabular numerals and heights are in `em`, so any value or digit count fits.
- **Relationship:** GRID structures the surface it sits on, GLASS/surfaces sit
  behind it; Counter adds no glow, border or other effect of its own.

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

`app/page.tsx` composes `HomeHero`, `WeekAtAGlance`, `EventTimelineSection`,
`AboutSection` and `FinalCta` from `lib/events` mock data. The event-series
name comes from `lib/site/config.ts`. The design system is demonstrated at
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
