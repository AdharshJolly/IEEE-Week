"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import {
  gsap,
  onceInView,
  useGSAP,
  withMotionPreference,
} from "@/lib/motion/gsap";
import {
  delay as delayTokens,
  distance,
  duration,
  ease,
  stagger,
} from "@/lib/motion/tokens";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealTag = "div" | "li" | "span" | "section" | "ul";
type RevealTrigger = "view" | "mount";

/*
 * Elements start hidden through inline `opacity: 0` in the server HTML, so
 * there is no flash before GSAP takes over after hydration.
 */
const hidden: CSSProperties = { opacity: 0 };

function offset(direction: RevealDirection, px: number) {
  switch (direction) {
    case "up":
      return { y: px };
    case "down":
      return { y: -px };
    case "left":
      return { x: -px };
    case "right":
      return { x: px };
    default:
      return {};
  }
}

/** Starts `play` on mount, or once the element enters the viewport. */
function start(trigger: RevealTrigger, el: Element, play: () => void) {
  if (trigger === "mount") play();
  else onceInView(el, play);
}

const ROOT = "[data-motion-root]";

/** Descendants matching `selector` whose nearest motion root is `root`. */
function owned(root: HTMLElement, selector: string) {
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.closest(ROOT) === root,
  );
}

/** Draws a `RuleDraw` rule; snaps under reduced motion. */
function drawRule(
  tl: gsap.core.Timeline,
  rule: HTMLElement,
  reduced: boolean,
  at: number,
) {
  tl.to(
    rule,
    {
      scaleX: 1,
      duration: reduced ? 0 : duration.reveal,
      ease: ease.emphasis,
    },
    at,
  );
}

interface CommonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: RevealTag;
  /** `view` reveals on entering the viewport; `mount` runs on load. */
  trigger?: RevealTrigger;
}

export interface RevealProps extends CommonProps {
  direction?: RevealDirection;
  distance?: keyof typeof distance;
  /** Seconds. Prefer `Stagger` for sibling sequencing. */
  delay?: number;
  /** Delay so the reveal follows a `MaskedText` title. */
  afterTitle?: boolean;
}

/** Single directional reveal. Opacity + transform only; no layout shift. */
export function Reveal({
  children,
  className,
  style,
  as = "div",
  trigger = "view",
  direction = "up",
  distance: dist = "md",
  delay = 0,
  afterTitle = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";
  const totalDelay = delay + (afterTitle ? delayTokens.afterTitle : 0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const rules = owned(el, "[data-rule-draw]");
      withMotionPreference((reduced) => {
        if (!reduced) gsap.set(el, offset(direction, distance[dist]));
        start(trigger, el, () => {
          const tl = gsap.timeline({ delay: totalDelay });
          tl.to(
            el,
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: duration.reveal,
              ease: ease.emphasis,
            },
            0,
          );
          rules.forEach((rule) => drawRule(tl, rule, reduced, 0));
        });
      });
    },
    { dependencies: [trigger, direction, dist, totalDelay] },
  );

  return (
    <Tag
      ref={ref}
      data-motion-root=""
      className={className}
      style={{ ...hidden, ...style }}
    >
      {children}
    </Tag>
  );
}

export interface StaggerProps extends CommonProps {
  gap?: keyof typeof stagger;
  /** Seconds before the first child starts. */
  delay?: number;
}

/**
 * Parent that sequences its `StaggerItem` (and `RuleDraw`) descendants by DOM
 * order. Items of a nested `Stagger` belong to that nested parent.
 */
export function Stagger({
  children,
  className,
  style,
  as = "div",
  trigger = "view",
  gap = "base",
  delay = 0,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const items = owned(root, "[data-stagger-item]");
      const rules = owned(root, "[data-rule-draw]");

      withMotionPreference((reduced) => {
        if (!reduced) {
          items.forEach((item) =>
            gsap.set(
              item,
              offset(
                item.dataset.direction as RevealDirection,
                Number(item.dataset.distance),
              ),
            ),
          );
        }
        start(trigger, root, () => {
          const tl = gsap.timeline({ delay });
          items.forEach((item, index) =>
            tl.to(
              item,
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: duration.reveal,
                ease: ease.emphasis,
              },
              index * stagger[gap],
            ),
          );
          // A rule plays with the item that contains it (else immediately).
          rules.forEach((rule) => {
            const index = items.findIndex((item) => item.contains(rule));
            drawRule(tl, rule, reduced, Math.max(index, 0) * stagger[gap]);
          });
        });
      });
    },
    { dependencies: [trigger, gap, delay] },
  );

  return (
    <Tag ref={ref} data-motion-root="" className={className} style={style}>
      {children}
    </Tag>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: RevealTag;
  direction?: RevealDirection;
  distance?: keyof typeof distance;
}

export function StaggerItem({
  children,
  className,
  style,
  as = "div",
  direction = "up",
  distance: dist = "md",
}: StaggerItemProps) {
  const Tag = as as "div";
  return (
    <Tag
      data-stagger-item=""
      data-direction={direction}
      data-distance={distance[dist]}
      className={className}
      style={{ ...hidden, ...style }}
    >
      {children}
    </Tag>
  );
}

/**
 * A rule that draws from its start edge when its `Stagger` parent reveals.
 * Decorative; it plays together with the `StaggerItem` that contains it.
 */
export function RuleDraw({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-rule-draw=""
      className={className}
      style={{ transformOrigin: "left", transform: "scaleX(0)" }}
    />
  );
}
