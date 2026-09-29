import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextStyle =
  "body-lg" | "body" | "body-sm" | "label" | "caption" | "meta";
export type TextTone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "muted"
  | "brand"
  | "on-deep"
  | "on-deep-secondary";

const styleClasses: Record<TextStyle, string> = {
  "body-lg": "type-body-lg",
  body: "type-body",
  "body-sm": "type-body-sm",
  label: "type-label",
  caption: "type-caption",
  meta: "type-meta",
};

const toneClasses: Record<TextTone, string> = {
  primary: "text-content-primary",
  secondary: "text-content-secondary",
  tertiary: "text-content-tertiary",
  muted: "text-content-muted",
  brand: "text-content-brand",
  "on-deep": "text-content-on-deep",
  "on-deep-secondary": "text-content-on-deep-secondary",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "label";
  visualStyle?: TextStyle;
  /** Omit to inherit the surrounding color. */
  tone?: TextTone;
}

export function Text({
  as = "p",
  visualStyle = "body",
  tone,
  className,
  ...props
}: TextProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(
        styleClasses[visualStyle],
        tone && toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  onDeep?: boolean;
}

/** Small-caps kicker with a leading rule. Ration it: one per few sections. */
export function Eyebrow({ onDeep = false, className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "type-eyebrow flex items-center gap-3 before:h-px before:w-8 before:bg-current",
        onDeep ? "text-content-on-deep-accent" : "text-content-brand",
        className,
      )}
      {...props}
    />
  );
}
