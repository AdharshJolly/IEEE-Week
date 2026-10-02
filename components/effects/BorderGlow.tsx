"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import {
  gsap,
  onceInView,
  useGSAP,
  withMotionPreference,
} from "@/lib/motion/gsap";
import { borderGlow as defaults, ease } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/*
 * BORDER primitive: proximity, interaction, focus.
 *
 * Adapted from the React Bits `BorderGlow` (edge-proximity maths, conic cone
 * masks and the three layered edge effects are unchanged). Colours, surfaces,
 * radii and timing come from the project tokens, and the sweep runs on GSAP.
 * The surface itself (fill, border, content) never depends on the effect.
 */

export type BorderGlowTone = "cyan" | "blue" | "purple";
export type BorderGlowSurface = "default" | "subtle" | "elevated" | "deep";
export type BorderGlowRadius = "card" | "panel";

/** Three CSS colours for the mesh border. Pass brand tokens, not hex. */
export type BorderGlowColors = readonly [string, string, string];

const toneColor: Record<BorderGlowTone, string> = {
  cyan: "var(--brand-cyan)",
  blue: "var(--brand-blue)",
  purple: "var(--brand-purple)",
};

const surfaceColor: Record<BorderGlowSurface, string> = {
  default: "var(--color-surface-default)",
  subtle: "var(--color-surface-subtle)",
  elevated: "var(--color-surface-elevated)",
  deep: "var(--color-surface-deep)",
};

const radiusVar: Record<BorderGlowRadius, string> = {
  card: "var(--radius-card)",
  panel: "var(--radius-panel)",
};

const defaultColors: BorderGlowColors = [
  "var(--brand-cyan)",
  "var(--brand-blue)",
  "var(--brand-purple)",
];

/* Opacity ladder (percent) of the layered glow, outermost line first. */
const glowSteps = [
  ["", 100],
  ["-60", 60],
  ["-50", 50],
  ["-40", 40],
  ["-30", 30],
  ["-20", 20],
  ["-10", 10],
] as const;

const gradientPositions = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const gradientColorIndex = [0, 1, 2, 0, 1, 2, 1];
const gradientKeys = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type Vars = Record<string, string | number>;

function glowVars(tone: BorderGlowTone, intensity: number): Vars {
  const base = toneColor[tone];
  const vars: Vars = {};
  for (const [key, opacity] of glowSteps) {
    const pct = Math.min(opacity * intensity, 100);
    vars[`--glow-color${key}`] =
      `color-mix(in srgb, ${base} ${pct}%, transparent)`;
  }
  return vars;
}

function gradientVars(colors: BorderGlowColors): Vars {
  const vars: Vars = {};
  gradientKeys.forEach((key, i) => {
    vars[`--gradient-${key}`] =
      `radial-gradient(at ${gradientPositions[i]}, ${colors[gradientColorIndex[i]]} 0px, transparent 50%)`;
  });
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

/** How far the pointer is along the path from the centre to the edge, 0-1. */
function edgeProximity(width: number, height: number, x: number, y: number) {
  const cx = width / 2;
  const cy = height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
  const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
  return clamp(1 / Math.min(kx, ky), 0, 1);
}

/** Pointer angle around the centre in degrees, 0 = straight up. */
function cursorAngle(width: number, height: number, x: number, y: number) {
  const dx = x - width / 2;
  const dy = y - height / 2;
  if (dx === 0 && dy === 0) return 0;
  const degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  return degrees < 0 ? degrees + 360 : degrees;
}

export interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  /** Glow hue. Defaults to cyan on `deep`, blue on light surfaces. */
  tone?: BorderGlowTone;
  surface?: BorderGlowSurface;
  radius?: BorderGlowRadius;
  /** How close the pointer must be to an edge for the glow to appear (0-80). */
  edgeSensitivity?: number;
  /** How far the outer glow extends beyond the surface, px. */
  glowRadius?: number;
  /** Glow opacity multiplier (0.1-3). */
  glowIntensity?: number;
  /** Width of the directional cone, percent (5-45). */
  coneSpread?: number;
  /** Opacity of the inner colour wash (0-1). */
  fillOpacity?: number;
  /** Mesh border colours: three CSS colours, brand tokens only. */
  colors?: BorderGlowColors;
  /** Play one intro sweep the first time the surface scrolls into view. */
  animated?: boolean;
}

/**
 * A surface whose edge lights up toward the pointer. Mouse-only: touch and pen
 * pointers, coarse-pointer devices and `prefers-reduced-motion` get the plain
 * surface (fill, border and content are unchanged). The effect is decorative
 * and must never be the only sign of focus, selection or state. Keep the real
 * focus ring on interactive children.
 *
 * The outer glow overflows the box by `glowRadius`, so do not place it inside
 * a container that clips overflow without padding to match.
 */
export function BorderGlow({
  children,
  className,
  tone,
  surface = "subtle",
  radius = "card",
  edgeSensitivity = defaults.edgeSensitivity,
  glowRadius = defaults.glowRadius,
  glowIntensity = defaults.glowIntensity,
  coneSpread = defaults.coneSpread,
  fillOpacity = defaults.fillOpacity,
  colors = defaultColors,
  animated = false,
}: BorderGlowProps) {
  const root = useRef<HTMLDivElement>(null);
  const deep = surface === "deep";
  const resolvedTone = tone ?? (deep ? "cyan" : "blue");

  useEffect(() => {
    const card = root.current;
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduce.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        card.style.setProperty(
          "--edge-proximity",
          (edgeProximity(width, height, x, y) * 100).toFixed(3),
        );
        card.style.setProperty(
          "--cursor-angle",
          `${cursorAngle(width, height, x, y).toFixed(3)}deg`,
        );
      });
    };

    card.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", move);
    };
  }, []);

  useGSAP(
    () => {
      const card = root.current;
      if (!animated || !card) return;
      const { sweep } = defaults;
      const touch = window.matchMedia("(hover: none), (pointer: coarse)");

      withMotionPreference((reduced) => {
        if (reduced) return;
        onceInView(card, () => {
          if (touch.matches) return;
          const state = { proximity: 0, angle: sweep.from };
          const paint = () => {
            card.style.setProperty("--edge-proximity", String(state.proximity));
            card.style.setProperty("--cursor-angle", `${state.angle}deg`);
          };
          card.dataset.sweep = "on";
          gsap
            .timeline({
              onUpdate: paint,
              onComplete: () => {
                delete card.dataset.sweep;
                card.style.removeProperty("--edge-proximity");
                card.style.removeProperty("--cursor-angle");
              },
            })
            .to(state, {
              proximity: 100,
              duration: sweep.fadeIn,
              ease: ease.standard,
            })
            .to(
              state,
              { angle: sweep.to, duration: sweep.travel, ease: ease.emphasis },
              0,
            )
            .to(
              state,
              { proximity: 0, duration: sweep.fadeOut, ease: ease.standard },
              sweep.travel - sweep.fadeOut,
            );
        });
      });
    },
    { scope: root, dependencies: [animated] },
  );

  const style = {
    "--card-bg": surfaceColor[surface],
    "--edge-sensitivity": clamp(edgeSensitivity, 0, 80),
    "--border-radius": radiusVar[radius],
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": clamp(coneSpread, 5, 45),
    "--fill-opacity": clamp(fillOpacity, 0, 1),
    ...glowVars(resolvedTone, clamp(glowIntensity, 0.1, 3)),
    ...gradientVars(colors),
  } as CSSProperties;

  return (
    <div
      ref={root}
      data-surface={deep ? "deep" : undefined}
      className={cn("border-glow", deep && "border-glow--deep", className)}
      style={style}
    >
      <span className="border-glow__edge" aria-hidden="true" />
      <div className="border-glow__inner">{children}</div>
    </div>
  );
}
