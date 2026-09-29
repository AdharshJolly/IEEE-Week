# Motion system

Source of truth for how motion works on the site. Built on the existing
`framer-motion` dependency plus CSS tokens; no other animation library.

## Principles

- Choreographed, not constant. Every effect marks a structural moment
  (arrival, progression, endpoint). The only continuous motion is one slow
  signal "packet" in the homepage hero.
- Opacity and transform only. No layout animation except the events filter
  grid, which uses a critically damped spring (no bounce).
- Brand- and content-independent. The visual language is signal traces, nodes,
  grids and progress rails. Nothing depends on the event-series name.
- Never blocks input: enter-only page transition, `pointer-events: none` on
  all decorative layers.

## Where things live

| Concern                                             | File                                                                                                                   |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| JS motion tokens (durations, eases, distances, etc) | `lib/motion/tokens.ts`                                                                                                 |
| CSS motion tokens and cursor/route CSS              | `app/globals.css` (`--duration-*`, `--ease-*`, `--distance-magnetic`, `.spotlight-layer`, `.magnetic`, `.page-signal`) |
| Primitives                                          | `components/motion/*`                                                                                                  |
| Event-series name                                   | `lib/site/config.ts` (`SERIES_NAME`)                                                                                   |

`duration` and `ease` in `tokens.ts` mirror the CSS variables; change both
together. Do not hardcode durations, easings, distances, delays, springs or
viewport thresholds in components.

## Primitives (`components/motion`)

All are Client Components; everything that uses them stays a Server Component
and passes content as children.

- `MotionProvider`: `MotionConfig reducedMotion="user"`, mounted in `app/layout.tsx`.
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

| Component                                                      | Primitives                                                                   |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `HomeHero`                                                     | `MaskedText`, `Reveal`, `Stagger`, `SignalField` (ambient), `Decor`          |
| `EventDetailHero`                                              | `MaskedText`, `Reveal`, `Stagger`, `SignalField`, `Decor`                    |
| `EventDateTimeline` (home "Upcoming highlights")               | `TimelineItem`, `TimelineSpineFill`, `TimelineSlide`                         |
| `SocietiesSection` (about page)                                | `Stagger`, `StaggerItem`, `RuleDraw` (indexed rows, staggered from the left) |
| `Card` with `href` (event/society cards), `EventListing` cards | `SpotlightLayer`; `.magnetic` on the card arrow / listing text block         |
| `EventRegistrationCta`, `FinalCta`                             | `Reveal`, `SignalTrail`                                                      |
| `SectionHeading`                                               | `Reveal`                                                                     |
| `app/template.tsx`                                             | `PageTransition` (opacity fade + one top-edge signal trace)                  |
| `Decor`                                                        | scroll parallax from tokens                                                  |

## Reduced motion

`MotionProvider` snaps all transforms; opacity still fades. CSS additionally
hides the cursor highlight, magnetic offset, ambient packet and route signal,
removes the text mask, and turns off `Decor` parallax and the timeline spine
fill. All content stays visible and usable.

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
- `.rise-in` / `.reveal` CSS utilities remain on pages not yet moved to the primitives (about, contact, events index, etc.).
