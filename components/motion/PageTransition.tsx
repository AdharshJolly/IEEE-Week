"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
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

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="page-signal"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: duration.slow, ease: ease.emphasis },
          opacity: { duration: duration.slow, delay: duration.slow * 0.6 },
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.page, ease: ease.standard }}
        className="flex min-h-full flex-1 flex-col"
      >
        {children}
      </motion.div>
    </>
  );
}
