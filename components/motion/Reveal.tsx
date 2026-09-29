"use client";

import { motion, type Variants } from "framer-motion";
import { type CSSProperties, type ReactNode } from "react";
import {
  delay as delayTokens,
  distance,
  duration,
  ease,
  stagger,
  viewport,
} from "@/lib/motion/tokens";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealTag = "div" | "li" | "span" | "section" | "ul";
type RevealTrigger = "view" | "mount";

const motionTags = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  section: motion.section,
  ul: motion.ul,
} as const;

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

function makeVariants(
  direction: RevealDirection,
  px: number,
  delay = 0,
): Variants {
  return {
    hidden: { opacity: 0, ...offset(direction, px) },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: duration.reveal, ease: ease.emphasis, delay },
    },
  };
}

const triggerProps = (trigger: RevealTrigger) =>
  trigger === "mount"
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport };

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
  const Tag = motionTags[as];
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      variants={makeVariants(
        direction,
        distance[dist],
        delay + (afterTitle ? delayTokens.afterTitle : 0),
      )}
      {...triggerProps(trigger)}
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

/** Parent that sequences `StaggerItem` children by DOM order. */
export function Stagger({
  children,
  className,
  style,
  as = "div",
  trigger = "view",
  gap = "base",
  delay = 0,
}: StaggerProps) {
  const Tag = motionTags[as];
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      variants={{
        hidden: {},
        shown: {
          transition: { staggerChildren: stagger[gap], delayChildren: delay },
        },
      }}
      {...triggerProps(trigger)}
    >
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
  const Tag = motionTags[as];
  return (
    <Tag
      className={className}
      style={style}
      variants={makeVariants(direction, distance[dist])}
    >
      {children}
    </Tag>
  );
}

/**
 * A rule that draws from its start edge when its `StaggerItem`/`Stagger`
 * parent reveals. Decorative; inherits the parent's variant state.
 */
export function RuleDraw({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left" }}
      variants={{
        hidden: { scaleX: 0 },
        shown: {
          scaleX: 1,
          transition: { duration: duration.reveal, ease: ease.emphasis },
        },
      }}
    />
  );
}
