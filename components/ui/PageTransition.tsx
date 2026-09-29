"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the URL has a hash, if so let the browser handle it.
    // Otherwise, force scroll to top on navigation.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}
