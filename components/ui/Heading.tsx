import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type HeadingStyle =
  "display" | "heading-lg" | "heading-md" | "heading-sm";

const styleClasses: Record<HeadingStyle, string> = {
  display: "text-display",
  "heading-lg": "text-heading-lg",
  "heading-md": "text-heading-md",
  "heading-sm": "text-heading-sm",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level — chosen for document structure, not appearance. */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Visual style — independent of `as` so hierarchy and appearance can diverge. */
  visualStyle?: HeadingStyle;
}

export function Heading({
  as = "h2",
  visualStyle = "heading-lg",
  className,
  ...props
}: HeadingProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(styleClasses[visualStyle], className)}
      {...props}
    />
  );
}
