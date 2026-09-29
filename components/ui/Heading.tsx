import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type HeadingStyle = "display" | "hero" | "h1" | "h2" | "h3" | "title";
export type HeadingTone = "primary" | "deep";

const styleClasses: Record<HeadingStyle, string> = {
  display: "type-display",
  hero: "type-hero",
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
  title: "type-title",
};

// `<em>` inside a heading is a brand-color emphasis, never italic: the same
// family and weight, so the emphasis never reads as a second typeface.
const toneClasses: Record<HeadingTone, string> = {
  primary: "text-content-primary [&_em]:text-content-brand",
  deep: "text-content-on-deep [&_em]:text-content-on-deep-accent",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level, chosen for document structure, not appearance. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Visual role, independent of `as`. */
  visualStyle?: HeadingStyle;
  /** `deep` for navy surfaces. */
  tone?: HeadingTone;
}

export function Heading({
  as = "h2",
  visualStyle = "h2",
  tone = "primary",
  className,
  ...props
}: HeadingProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(
        styleClasses[visualStyle],
        toneClasses[tone],
        "[&_em]:not-italic",
        className,
      )}
      {...props}
    />
  );
}
