"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function TransitionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the URL has a hash, if so let the browser handle it.
    // Otherwise, force scroll to top on navigation.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col flex-1 min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
