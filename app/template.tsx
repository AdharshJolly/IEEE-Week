"use client";

import { motion } from "framer-motion";
import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
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
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex min-h-full flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}
