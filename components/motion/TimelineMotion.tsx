"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, withMotionPreference } from "@/lib/motion/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { activeBand, ease, scrollRange } from "@/lib/motion/tokens";

/**
 * One timeline row. Marks itself active while it crosses the middle of the
 * viewport (IntersectionObserver, no scroll handler). Styling hooks off
 * `data-active`; its spine segment is `TimelineSpineFill`.
 */
export function TimelineItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: activeBand },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref} data-active={active} className={className}>
      {children}
    </li>
  );
}

/**
 * Spine segment that fills as scroll passes its `TimelineItem` row (scrubbed
 * ScrollTrigger). Not animated under reduced motion; CSS hides it there.
 */
export function TimelineSpineFill({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const row = el?.closest("li");
    if (!el || !row) return;
    withMotionPreference((reduced) => {
      if (reduced) return;
      gsap.to(el, {
        scaleY: 1,
        ease: ease.linear,
        scrollTrigger: {
          trigger: row,
          start: scrollRange.rail.start,
          end: scrollRange.rail.end,
          scrub: true,
        },
      });
    });
  });

  return (
    <span
      ref={ref}
      className={className}
      style={{ transform: "scaleY(0)", transformOrigin: "top" }}
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
  return (
    <Reveal className={className} direction={from}>
      {children}
    </Reveal>
  );
}
