import Link from "next/link";
import { type HTMLAttributes } from "react";
import { SpotlightLayer } from "@/components/motion/SpotlightLayer";
import { cn } from "@/lib/utils";

export type CardTone =
  | "default"
  | "subtle"
  | "brand"
  | "accent"
  | "special"
  | "solid"
  | "deep"
  | "bare";
export type CardRadius = "card" | "panel";

const toneStyles: Record<CardTone, string> = {
  default: "border-line bg-surface-default text-content-primary",
  subtle: "border-transparent bg-surface-subtle text-content-primary",
  brand: "border-transparent bg-surface-brand text-content-primary",
  accent: "border-transparent bg-surface-accent text-content-primary",
  special: "border-transparent bg-surface-special text-content-primary",
  // Elevated: for cards sitting on a tinted section.
  solid:
    "border-line-subtle bg-surface-elevated text-content-primary shadow-rest",
  deep: "border-line-on-deep bg-surface-deep text-content-on-deep",
  // No surface of its own: sits inside a BorderGlow, which owns the fill,
  // border and hover feedback.
  bare: "border-transparent bg-transparent text-content-primary",
};

interface CardStyleOptions {
  tone?: CardTone;
  radius?: CardRadius;
  interactive?: boolean;
}

export function cardStyles({
  tone = "default",
  radius = "card",
  interactive = false,
}: CardStyleOptions = {}): string {
  return cn(
    "group relative flex flex-col overflow-hidden border transition-[transform,box-shadow,border-color] duration-slow ease-emphasis",
    radius === "panel" ? "rounded-panel" : "rounded-card",
    toneStyles[tone],
    interactive &&
      tone !== "bare" &&
      "hover:-translate-y-0.5 hover:border-line-brand hover:shadow-raised motion-reduce:hover:translate-y-0",
  );
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "li";
  tone?: CardTone;
  radius?: CardRadius;
  /** Makes the whole card a link. Its content must not hold other controls. */
  href?: string;
}

export function Card({
  as: Component = "div",
  tone,
  radius,
  href,
  className,
  children,
  ...props
}: CardProps) {
  const classes = cn(
    cardStyles({ tone, radius, interactive: Boolean(href) }),
    className,
  );
  const surface = tone === "deep" ? "deep" : undefined;
  if (href) {
    return (
      <Component className="contents" {...props}>
        <Link
          href={href}
          data-surface={surface}
          className={cn(classes, "no-underline")}
        >
          {tone !== "bare" && <SpotlightLayer />}
          {children}
        </Link>
      </Component>
    );
  }
  return (
    <Component data-surface={surface} className={classes} {...props}>
      {children}
    </Component>
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-3 p-5 sm:p-6", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-line-subtle mt-auto flex items-center justify-between gap-3 border-t pt-4",
        className,
      )}
      {...props}
    />
  );
}
