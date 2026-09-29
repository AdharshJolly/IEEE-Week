"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";

/**
 * App-wide motion policy. `reducedMotion="user"` makes every framer-motion
 * transform/layout animation snap under `prefers-reduced-motion`; opacity
 * still fades so content never pops.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
