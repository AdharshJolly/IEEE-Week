/**
 * Motion tokens for framer-motion primitives. The single place for durations,
 * easings, distances, staggers, springs and viewport thresholds.
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

export const ease = {
  standard: [0.2, 0, 0, 1],
  emphasis: [0.16, 1, 0.3, 1],
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

/** `whileInView` options. `amount` is a fraction of the element, not pixels. */
export const viewport = {
  once: true,
  amount: 0.2,
} as const;

/** Rest-state passes for scroll-linked progress (framer `useScroll` offsets). */
export const scrollOffset = {
  /** Progress runs while the element crosses the middle of the viewport. */
  rail: ["start 65%", "end 65%"],
  parallax: ["start end", "end start"],
} as const;

/** IntersectionObserver margin defining the "active" band mid-viewport. */
export const activeBand = "-40% 0px -40% 0px";

/** Parallax travel as a percentage of the element's own height. */
export const parallaxTravel = ["-8%", "8%"] as const;

/** Layout (filter) transitions: critically damped, never bouncy. */
export const spring = {
  layout: { type: "spring", stiffness: 380, damping: 40, mass: 0.9 },
} as const;

/** Ambient loops. Idle gap keeps them from reading as constant movement. */
export const ambient = {
  packetDuration: 5,
  packetIdle: 6,
} as const;
