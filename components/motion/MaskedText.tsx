"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
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
  return (
    <motion.span
      data-masked=""
      className={className}
      style={{ display: "block" }}
      initial={{ clipPath: "inset(0 0 100% 0)", y: "0.35em", opacity: 0 }}
      animate={{
        clipPath: "inset(-0.1em -0.1em -0.25em -0.1em)",
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: duration.reveal, ease: ease.emphasis, delay }}
    >
      {children}
    </motion.span>
  );
}
