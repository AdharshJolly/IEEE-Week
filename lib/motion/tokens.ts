/**
 * Motion tokens for the GSAP primitives. The single place for durations,
 * easings, distances, staggers and viewport thresholds.
 *
 * Durations and easings mirror the CSS tokens in `app/globals.css`
 * (`--duration-*`, `--ease-*`), which cover CSS-driven transitions. Keep the
 * two in step. Nothing here may reference the event-series name or any
 * content-derived measurement.
 */

/** Seconds. */
export const duration = {
  fast: 0.15,
  base: 0.26,
  slow: 0.48,
  reveal: 0.72,
  page: 0.32,
  trace: 1.1,
} as const;

/** Cubic-bezier control points. Registered as GSAP eases in `./gsap.ts`. */
export const bezier = {
  standard: [0.2, 0, 0, 1],
  emphasis: [0.16, 1, 0.3, 1],
} as const;

/** GSAP ease names (registered from `bezier`). Pass straight to `ease:`. */
export const ease = {
  standard: "motion-standard",
  emphasis: "motion-emphasis",
  linear: "none",
} as const;

/** Travel distance in px for directional reveals. */
export const distance = {
  sm: 12,
  md: 20,
  lg: 32,
} as const;

/** Seconds between sibling reveals. */
export const stagger = {
  tight: 0.05,
  base: 0.08,
} as const;

export const delay = {
  /** Title mask starts just after the eyebrow above it. */
  title: 0.1,
  /** Lets a title mask start before dependent content follows it. */
  afterTitle: 0.18,
} as const;

/** Reveal trigger options. `amount` is a fraction of the element, not pixels. */
export const viewport = {
  once: true,
  amount: 0.2,
} as const;

/** ScrollTrigger ranges for scroll-linked (scrubbed) progress. */
export const scrollRange = {
  /** Progress runs while the element crosses the middle of the viewport. */
  rail: { start: "top 65%", end: "bottom 65%" },
  parallax: { start: "top bottom", end: "bottom top" },
} as const;

/** IntersectionObserver margin defining the "active" band mid-viewport. */
export const activeBand = "-40% 0px -40% 0px";

/** Parallax travel as a percentage of the element's own height. */
export const parallaxTravel = ["-8%", "8%"] as const;

/** Layout (filter) transitions: smooth deceleration, never bouncy. */
export const layout = {
  duration: duration.slow,
  ease: ease.emphasis,
} as const;

/** Ambient loops. Idle gap keeps them from reading as constant movement. */
export const ambient = {
  packetDuration: 5,
  packetIdle: 6,
} as const;

/**
 * PixelReveal (see `components/motion/PixelReveal.tsx`). Milliseconds, because
 * the Web Animations driver it wraps takes ms; derived from the second-based
 * tokens above so the two scales cannot drift apart.
 */
export const pixel = {
  /** Whole swap. */
  duration: Math.round(duration.reveal * 1000),
  /** One pixel opening. */
  pixelDuration: Math.round(duration.slow * 1000),
  /** Edge of one pixel, px. The grid grows this itself when it would exceed the pixel cap. */
  size: 40,
  /** Starting size of each pixel relative to its final size. */
  scale: 0.35,
  /** Mirrors `bezier.emphasis`. */
  easing: `cubic-bezier(${bezier.emphasis.join(", ")})`,
  /**
   * Intentional pattern per use. Directional or centred, never random: the
   * order should read as the reveal travelling, not as noise.
   */
  pattern: {
    /** The one signature moment: transformation across the hero panel. */
    hero: "diagonal",
    /** Row metadata: reads left to right like the row itself. */
    row: "left-to-right",
    /** Small marks and tags: expands from the middle. */
    mark: "center",
  },
} as const;

/**
 * BorderGlow (see `components/effects/BorderGlow.tsx`). Defaults for the
 * proximity glow plus the optional intro sweep. Seconds and degrees, derived
 * from the duration scale above where a matching step exists.
 */
export const borderGlow = {
  /** Pointer must be this close to an edge (0-100) before the glow shows. */
  edgeSensitivity: 30,
  /** Width of the directional cone mask, percent (5-45). */
  coneSpread: 25,
  /** How far the outer glow extends beyond the surface, px. */
  glowRadius: 32,
  glowIntensity: 1,
  /** Opacity of the soft inner colour wash near the edge. */
  fillOpacity: 0.4,
  sweep: {
    /** Cone angle at the start and end of the sweep (one full lap). */
    from: 110,
    to: 465,
    fadeIn: duration.slow,
    travel: duration.trace * 2,
    fadeOut: duration.reveal,
  },
} as const;

/**
 * SpecularButton (see `components/ui/SpecularButton.tsx` and
 * `lib/motion/specular.ts`). The SPECULAR primitive: a WebGL edge highlight
 * that follows the pointer and fades in with proximity. It never loops idly.
 * Angles in degrees, distances in px, rates per second (exponential easing).
 */
const specularBase = {
  /** Highlight arc size and how softly it fades at its ends. */
  shineSize: 10,
  shineFade: 40,
  /** Canvas bleed past the button edge so the rim glow can spill outside it. */
  bleed: 8,
  /** How quickly the light turns toward the pointer / brightness settles. */
  steerRate: 7,
  brightRate: 8,
} as const;

export const specular = {
  /** Meaningful actions: Register, Explore Events, View Event. */
  primary: {
    ...specularBase,
    intensity: 1,
    thickness: 1.25,
    proximity: 220,
  },
  /** Restrained: dimmer, thinner, only reacts when the pointer is near. */
  secondary: {
    ...specularBase,
    intensity: 0.6,
    thickness: 1,
    proximity: 140,
  },
} as const;

export type SpecularPreset = keyof typeof specular;

/**
 * Counter (see `components/ui/Counter.tsx`). The COUNTER primitive: each digit
 * place rolls on a damped spring (unit mass) driven by the GSAP ticker.
 * Overdamped on purpose: digits settle without overshooting, so a number never
 * reads as a different number mid-roll. Reduced motion skips the spring.
 */
export const counter = {
  stiffness: 100,
  damping: 30,
  /** Position (in digit units) and speed below which a roll is settled. */
  restDelta: 0.01,
  /** Longest roll, in digit units; bigger jumps start this close so they stay brief. */
  maxTravel: 25,
  /** Fade height at the top and bottom edge of the window. */
  gradientHeight: "0.12em",
} as const;
