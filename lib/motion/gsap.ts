"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { bezier, ease, viewport } from "@/lib/motion/tokens";

/**
 * Single GSAP entry point. Every motion primitive imports from here so plugin
 * registration and the token eases exist exactly once. Registration is
 * idempotent and browser-only.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, Flip);
  CustomEase.create(ease.standard, bezier.standard.join(","));
  CustomEase.create(ease.emphasis, bezier.emphasis.join(","));
}

export { gsap, ScrollTrigger, Flip, useGSAP };

/**
 * Runs `build` once for the user's motion preference and again whenever it
 * changes. `reduced` means `prefers-reduced-motion: reduce`: primitives then
 * skip transforms and only fade opacity, so content never pops. Call inside a
 * `useGSAP` callback so the matchMedia is reverted with the component.
 */
export function withMotionPreference(build: (reduced: boolean) => void) {
  const mm = gsap.matchMedia();
  mm.add(
    {
      reduced: "(prefers-reduced-motion: reduce)",
      full: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      build(Boolean(context.conditions?.reduced));
    },
  );
  return mm;
}

/**
 * Calls `play` once when `amount` of the element has entered the viewport
 * (mirrors an IntersectionObserver threshold). ScrollTriggers created inside
 * `useGSAP` are cleaned up with it.
 */
export function onceInView(el: Element, play: () => void) {
  return ScrollTrigger.create({
    trigger: el,
    start: () =>
      `top bottom-=${el.getBoundingClientRect().height * viewport.amount}`,
    once: viewport.once,
    onEnter: play,
  });
}
