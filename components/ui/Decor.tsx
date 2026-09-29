"use client";

import { type CSSProperties, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { parallaxTravel, scrollOffset } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

export type DecorVariant =
  | "dots"
  | "grid"
  | "rings"
  | "rings-cyan"
  | "rings-on-deep"
  | "field-cyan"
  | "field-purple";

const variantStyles: Record<DecorVariant, string> = {
  dots: "deco-dots",
  grid: "deco-grid",
  rings: "deco-rings",
  "rings-cyan": "deco-rings deco-rings-cyan",
  "rings-on-deep": "deco-rings deco-rings-on-deep",
  "field-cyan": "deco-field-cyan",
  "field-purple": "deco-field-purple",
};

export interface DecorProps {
  variant: DecorVariant;
  /** Origin of the rings as a CSS position, e.g. "100% 0%". */
  at?: string;
  className?: string;
}

/**
 * Non-semantic ornament: hidden from assistive tech, never interactive, and
 * masked so it fades out before it can compete with content.
 */
export function Decor({ variant, at, className }: DecorProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...scrollOffset.parallax],
  });
  
  // Subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [...parallaxTravel]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{
        y,
        ...(at ? { "--ring-at": at } as CSSProperties : {}),
      }}
      className={cn(
        "pointer-events-none absolute -z-10 motion-reduce:!transform-none",
        variantStyles[variant],
        className,
      )}
    />
  );
}
