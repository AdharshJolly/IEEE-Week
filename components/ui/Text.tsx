import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextStyle = "body-lg" | "body" | "body-sm" | "label" | "caption";

const styleClasses: Record<TextStyle, string> = {
  "body-lg": "text-body-lg",
  body: "text-body",
  "body-sm": "text-body-sm",
  label: "text-label",
  caption: "text-caption",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label";
  visualStyle?: TextStyle;
}

export function Text({
  as = "p",
  visualStyle = "body",
  className,
  ...props
}: TextProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(styleClasses[visualStyle], className)}
      {...props}
    />
  );
}
