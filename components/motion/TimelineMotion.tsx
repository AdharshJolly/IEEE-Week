"use client";

import { motion, useInView, useScroll, type MotionValue } from "framer-motion";
import { createContext, type ReactNode, useContext, useRef } from "react";
import {
  activeBand,
  distance,
  duration,
  ease,
  scrollOffset,
  viewport,
} from "@/lib/motion/tokens";

const ProgressContext = createContext<MotionValue<number> | null>(null);

/**
 * One timeline row. Marks itself active while it crosses the middle of the
 * viewport (IntersectionObserver, no scroll handler) and exposes scroll
 * progress to its spine segment. Styling hooks off `data-active`.
 */
export function TimelineItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: activeBand });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...scrollOffset.rail],
  });

  return (
    <ProgressContext.Provider value={scrollYProgress}>
      <li ref={ref} data-active={active} className={className}>
        {children}
      </li>
    </ProgressContext.Provider>
  );
}

/** Spine segment that fills as scroll passes the row. Hidden if reduced. */
export function TimelineSpineFill({ className }: { className?: string }) {
  const progress = useContext(ProgressContext);
  if (!progress) return null;
  return (
    <motion.span
      className={className}
      style={{ scaleY: progress, transformOrigin: "top" }}
    />
  );
}

/** Slides a timeline column in from its side once, with the row. */
export function TimelineSlide({
  children,
  className,
  from,
}: {
  children: ReactNode;
  className?: string;
  from: "left" | "right";
}) {
  const x = from === "left" ? -distance.md : distance.md;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: duration.reveal, ease: ease.emphasis }}
    >
      {children}
    </motion.div>
  );
}
