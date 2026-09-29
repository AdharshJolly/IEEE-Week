"use client";

import { motion } from "framer-motion";
import { ambient, duration, ease, viewport } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/*
 * Signal-line language: thin orthogonal traces that draw in, end at a node,
 * and (optionally) carry a slow "packet". Purely geometric and brand-neutral;
 * colour comes from `currentColor`, so pass a token text class.
 */

function Trace({
  d,
  node,
  delay = 0,
  packet = false,
  trigger = "view",
}: {
  d: string;
  node: [number, number];
  delay?: number;
  packet?: boolean;
  trigger?: "view" | "mount";
}) {
  const drive =
    trigger === "mount"
      ? { animate: "shown" as const }
      : { whileInView: "shown" as const, viewport };
  return (
    <motion.g initial="hidden" {...drive}>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          shown: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: duration.trace,
              ease: ease.emphasis,
              delay,
            },
          },
        }}
      />
      <motion.circle
        cx={node[0]}
        cy={node[1]}
        r={3.5}
        fill="currentColor"
        variants={{
          hidden: { opacity: 0 },
          shown: {
            opacity: 1,
            transition: {
              duration: duration.base,
              ease: ease.standard,
              delay: delay + duration.trace * 0.8,
            },
          },
        }}
      />
      {packet && (
        <motion.path
          d={d}
          pathLength={100}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="4 96"
          className="signal-packet"
          initial={{ strokeDashoffset: 4, opacity: 0 }}
          animate={{ strokeDashoffset: -100, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: ambient.packetDuration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: ambient.packetIdle,
            delay: delay + duration.trace + 1,
          }}
        />
      )}
    </motion.g>
  );
}

export interface SignalFieldProps {
  className?: string;
  /** Adds a slow travelling packet: the only continuous motion. */
  ambient?: boolean;
}

/**
 * Decorative hero backdrop: traces converging from the right edge toward a
 * node cluster. Fills its (absolutely positioned) parent; `aria-hidden`.
 */
export function SignalField({
  className,
  ambient: withAmbient = false,
}: SignalFieldProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMaxYMid slice"
      className={cn(
        "text-brand-cyan/50 pointer-events-none absolute -z-10",
        className,
      )}
    >
      <Trace
        d="M1200 120 H860 Q820 120 820 160 V260 Q820 300 780 300 H640"
        node={[640, 300]}
        trigger="mount"
        delay={0.5}
        packet={withAmbient}
      />
      <Trace
        d="M1200 470 H900 Q860 470 860 430 V340 Q860 300 820 300"
        node={[820, 300]}
        trigger="mount"
        delay={0.8}
      />
      <Trace d="M1200 300 H1040" node={[1040, 300]} trigger="mount" delay={1} />
    </svg>
  );
}

export interface SignalTrailProps {
  className?: string;
}

/**
 * A trace that runs in from the right and drops down into the element that
 * follows it (the registration button), marking it as the endpoint.
 */
export function SignalTrail({ className }: SignalTrailProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 44"
      preserveAspectRatio="xMinYMid meet"
      className={cn(
        "text-interactive-primary/60 pointer-events-none h-11 w-full max-w-xs",
        className,
      )}
    >
      <Trace d="M320 6 H64 Q22 6 22 44" node={[22, 40]} />
    </svg>
  );
}
