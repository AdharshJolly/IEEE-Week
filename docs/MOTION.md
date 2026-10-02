# Motion system

Source of truth for how motion works on the site. Built on
[GSAP](https://gsap.com) (`gsap` + `@gsap/react`, with the ScrollTrigger,
CustomEase and Flip plugins) plus CSS tokens; no other animation library.

## Principles

- Choreographed, not constant. Every effect marks a structural moment
  (arrival, progression, endpoint). The only continuous motion is one slow
  signal "packet" in the homepage hero.
- Opacity and transform only. No layout animation except the events filter
  grid, which uses GSAP Flip with the `layout` token (smooth deceleration, no bounce).
- Brand- and content-independent. The visual language is signal traces, nodes,
  grids and progress rails. Nothing depends on the event-series name.
- Never blocks input: enter-only page transition, `pointer-events: none` on
  all decorative layers.

## Where things live

| Concern                                                | File                                                                                                                   |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| JS motion tokens (durations, eases, distances, etc)    | `lib/motion/tokens.ts`                                                                                                 |
| GSAP setup (plugin registration, token eases, helpers) | `lib/motion/gsap.ts`. Import `gsap`, `useGSAP`, `ScrollTrigger`, `Flip` from here, never from `gsap` directly          |
| CSS motion tokens and cursor/route CSS                 | `app/globals.css` (`--duration-*`, `--ease-*`, `--distance-magnetic`, `.spotlight-layer`, `.magnetic`, `.page-signal`) |
| Primitives                                             | `components/motion/*`                                                                                                  |
| Event-series name                                      | `lib/site/config.ts` (`SERIES_NAME`)                                                                                   |

`duration` and `ease` in `tokens.ts` mirror the CSS variables; change both
together. Do not hardcode durations, easings, distances, delays or
viewport thresholds in components.

## Primitives (`components/motion`)

All are Client Components; everything that uses them stays a Server Component
and passes content as children.

- `Reveal`: one directional reveal (`trigger` `view` or `mount`).
- `Stagger` / `StaggerItem`: sequenced children. `RuleDraw`: a rule that draws with its parent.
- `MaskedText`: masked wipe and slide of a whole text block. It does not split
  by letter, word or line, so any title length or wrapping works. Place it
  inside the heading element.
- `SignalField` (hero backdrop traces, optional ambient packet) and
  `SignalTrail` (trace dropping into a CTA): the signal-line language.
- `TimelineItem`, `TimelineSpineFill`, `TimelineSlide`: scroll-linked spine
  fill, `data-active` (IntersectionObserver band) and directional slide.
- `SpotlightLayer`: cursor-following highlight; writes `--mx/--my/--tx/--ty` on
  its parent. Children with `.magnetic` shift by a few px from `--tx/--ty`.
- `PageTransition`: used by `app/template.tsx`.

## Usage by component

| Component                                                      | Primitives                                                                                                                                                 |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HomeHero`                                                     | `MaskedText`, `Reveal`, `Stagger`, `SignalField` (ambient), `Decor`                                                                                        |
| `EventDetailHero`                                              | `MaskedText`, `Reveal`, `Stagger`, `SignalField`, `Decor`                                                                                                  |
| `EventDateTimeline` (home "Upcoming highlights")               | `TimelineItem`, `TimelineSpineFill`, `TimelineSlide`                                                                                                       |
| `SocietiesSection` (about page)                                | Per-item `Reveal` from the left (column-staggered in grid layout) and `RuleDraw` index rules; each item triggers on its own so tall lists reveal correctly |
| `Card` with `href` (event/society cards), `EventListing` cards | `SpotlightLayer`; `.magnetic` on the card arrow / listing text block                                                                                       |
| `FinalCta` (home, events, about)                               | `Reveal`, `SignalTrail`                                                                                                                                    |
| `EventRegistrationCta`                                         | `Reveal`, `SignalTrail`. Currently not rendered anywhere; the event page uses the registration card in `EventDetailBody`, which has no motion              |
| `SectionHeading`                                               | `Reveal`                                                                                                                                                   |
| `app/template.tsx`                                             | `PageTransition` (opacity fade + one top-edge signal trace)                                                                                                |
| `Decor`                                                        | scrubbed ScrollTrigger parallax from tokens                                                                                                                |

## Reduced motion

Each primitive reads `prefers-reduced-motion` through `withMotionPreference` (GSAP `matchMedia`) in `lib/motion/gsap.ts`: transforms, path drawing, scrub and the ambient packet are skipped, and opacity still fades. CSS additionally
hides the cursor highlight, magnetic offset, ambient packet and route signal,
removes the text mask, and turns off `Decor` parallax and the timeline spine
fill. All content stays visible and usable.

## PixelReveal

`components/motion/PixelReveal.tsx` wraps the React Bits PixelSwap engine
(ported to TypeScript, algorithm unchanged) for one purpose: showing that
real information has changed state. Defaults and patterns come from `pixel`
in `lib/motion/tokens.ts`.

- **Where it is used:** the single homepage hero panel (schedule overview to
  opening event, `diagonal`) and the organiser cell of each event row (codes to
  full names, `left-to-right`). The grid only mounts during a transition, so at
  most a few pixel grids ever exist at once. Do not add it to decorative
  elements, cards or long lists of look-alike items.
- **Sizing:** with no `aspectRatio` an invisible in-flow copy of both states
  sizes the box, so content of any length or ratio fits. Do not put element
  ids in either state (they are duplicated). Never use fixed dimensions.
- **Triggers:** default `manual`; callers drive `active`. Pair it with a real
  `<button>` (hero) or pointer-mouse / focus (rows). `hover` and `click`
  triggers exist for demos; `click` adds `role="button"`, Enter/Space and
  `aria-pressed`.
- **Reduced motion:** the state changes immediately with no pixels.
- **Touch:** nothing depends on hover. Rows only react to `pointerType ===
"mouse"` and keyboard focus; below `md` the full names show plainly.
  Anything revealed must also be reachable without the reveal.
- **A11y:** the hidden state is `visibility: hidden` and `aria-hidden`; the
  transition grid is `aria-hidden` and `inert`.

## BorderGlow

`components/effects/BorderGlow.tsx` is the BORDER primitive (design guidance in
`docs/ARCHITECTURE.md`). Interaction behaviour:

- **Pointer:** mouse only. `pointermove` is rAF-throttled and writes
  `--edge-proximity` and `--cursor-angle` on the element; CSS masks and fades
  the layers. The layers only show while hovered. Touch and pen pointers are
  ignored.
- **Intro sweep (`animated`):** one GSAP timeline the first time the element
  enters view (`onceInView`), timings from `borderGlow.sweep` in
  `lib/motion/tokens.ts`. Skipped under reduced motion and on coarse pointers.
- **Reduced motion / touch:** glow layers are `display: none`; the surface,
  border and content are unchanged.
- **Stacking:** do not combine with `SpotlightLayer`, `.magnetic` or
  `PixelReveal` on the same element. `Card tone="bare"` skips the spotlight and hover lift
  for that reason.

## SpecularButton

`components/ui/SpecularButton.tsx` is the SPECULAR primitive; the engine is
`lib/motion/specular.ts` (OGL, loaded lazily) with values in `specular` in
`lib/motion/tokens.ts`.

- **Pointer:** one shared `pointermove` listener; the highlight fades in with
  distance to the button and steers toward the pointer. Touch is ignored.
- **Render loop:** only runs while the highlight is visible; it sleeps once
  faded. The WebGL context is created on first proximity and released when the
  button leaves the viewport.
- **Off when:** reduced motion, `(hover: none)` / coarse pointer, disabled,
  tertiary/ghost, or WebGL unavailable. The button looks and works the same.
- **Stacking:** never combine with BorderGlow, PixelReveal, spotlight or
  magnetic effects.

## Counter

`components/ui/Counter.tsx` is the COUNTER primitive (guidance in
`docs/ARCHITECTURE.md`). Each digit place rolls on a unit-mass spring stepped
by the GSAP ticker (`counter` in `lib/motion/tokens.ts`: overdamped, no
overshoot); the ticker callback is only attached while a roll is in progress.
It animates `transform` only. Reduced motion is read through
`withMotionPreference`: the value is applied immediately, with no roll. Do not
combine with PixelReveal, BorderGlow or spotlight effects on one element.

## Touch devices

`SpotlightLayer` ignores non-mouse pointers, and CSS hides the highlight and
magnetic offset under `(hover: none), (pointer: coarse)`.

## Event-series name

`SERIES_NAME` in `lib/site/config.ts` is the single source, used by the hero,
metadata, CTAs and related copy. Motion code receives titles as children/props
and makes no assumptions about length, words or dimensions. Verified with
hypothetical names ("IEEE Week", "IEEE Innovation Festival", "IEEE Technology &
Innovation Summit", "IEEE 2026", "Innovation") at ~1536, 820 and 390px: no
overflow, clipping or layout shift. Those names are test inputs only.

## Limitations

- The page transition is enter-only (no exit animation) so navigation is never delayed.
- No loading screen exists, so none was added. Route feedback is the top-edge signal.
- Hero content is hidden until hydration (as the previous page transition already was).
- `.rise-in` / `.reveal` CSS utilities are still required and stay in `globals.css`: they drive the about, contact and events-index heroes, `EventHero`, `EventTimeline`, `NavMobileMenu` and the design-system showcase. They use the same duration and ease tokens and are disabled under reduced motion. Move a page to the primitives only when it is being redesigned.
- Hidden-until-revealed elements render with inline `opacity: 0` so there is no flash before hydration; keep that when adding primitives.
- The events filter keeps every card mounted and toggles `hidden`, so Flip can animate cards out; cards have no mount-time entrance (the page fade covers it).
- `Reveal` uses an in-view threshold of 20% of the element, so never wrap a container taller than about five viewports; reveal its items individually instead.
