"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { duration, ease } from "@/lib/motion/tokens";

/**
 * Route-level enter transition, mounted from `app/template.tsx` (which
 * remounts per navigation). A short opacity fade plus one signal trace across
 * the top edge. Enter-only by design: exit animations would delay navigation.
 * Opacity-only on the wrapper, so sticky/fixed descendants keep working.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Let the browser handle in-page hashes; otherwise start at the top.
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  const signal = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(page.current, {
      opacity: 1,
      duration: duration.page,
      ease: ease.standard,
    });
    gsap.to(signal.current, {
      scaleX: 1,
      duration: duration.slow,
      ease: ease.emphasis,
    });
    gsap.to(signal.current, {
      opacity: 0,
      duration: duration.slow,
      delay: duration.slow * 0.6,
    });
  });

  return (
    <>
      <div
        ref={signal}
        aria-hidden="true"
        className="page-signal"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={page}
        className="flex min-h-full flex-1 flex-col"
        style={{ opacity: 0 }}
      >
        {children}
      </div>
    </>
  );
}
