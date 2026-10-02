"use client";

import { type ReactNode, useRef } from "react";
import { gsap, useGSAP, withMotionPreference } from "@/lib/motion/gsap";
import { duration, ease } from "@/lib/motion/tokens";

export interface MaskedTextProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
}

/**
 * Masked typographic reveal for a whole text block. It wipes and slides the
 * block itself, so it never splits by letter, word or line and works for any
 * title length or wrapping. The mask has bottom slack so descenders and
 * `<em>` runs are never clipped, and it is removed when reduced motion is set
 * (see `[data-masked]` in globals.css).
 *
 * Place it inside the heading element, not around it, to keep semantics.
 */
export function MaskedText({
  children,
  className,
  delay = 0,
}: MaskedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      withMotionPreference((reduced) => {
        if (!reduced) gsap.set(el, { y: "0.35em" });
        gsap.to(el, {
          clipPath: "inset(-0.1em -0.1em -0.25em -0.1em)",
          y: 0,
          opacity: 1,
          duration: duration.reveal,
          ease: ease.emphasis,
          delay,
        });
      });
    },
    { dependencies: [delay] },
  );

  return (
    <span
      ref={ref}
      data-masked=""
      className={className}
      style={{
        display: "block",
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      }}
    >
      {children}
    </span>
  );
}
