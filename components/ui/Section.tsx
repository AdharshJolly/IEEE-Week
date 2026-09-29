import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./Container";

export type SectionTone =
  "default" | "subtle" | "muted" | "brand" | "accent" | "special" | "deep";
export type SectionSpacing = "none" | "sm" | "md" | "lg";

const toneStyles: Record<SectionTone, string> = {
  default: "bg-surface-default text-content-primary",
  subtle: "bg-surface-subtle text-content-primary",
  muted: "bg-surface-muted text-content-primary",
  brand: "bg-surface-brand text-content-primary",
  accent: "bg-surface-accent text-content-primary",
  special: "bg-surface-special text-content-primary",
  deep: "bg-surface-deep text-content-on-deep",
};

// Fluid vertical rhythm from the --spacing-section-* tokens.
const spacingStyles: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
};

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "id"> {
  id?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  size?: ContainerProps["size"];
  /** Decorative layer rendered behind the content (use <Decor />). */
  decor?: ReactNode;
  children: ReactNode;
}

/** Full-bleed band + centered container. The unit of page rhythm. */
export function Section({
  tone = "default",
  spacing = "md",
  size,
  decor,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-surface={tone === "deep" ? "deep" : undefined}
      className={cn(
        "relative isolate overflow-hidden",
        toneStyles[tone],
        spacingStyles[spacing],
        className,
      )}
      {...props}
    >
      {decor}
      <Container size={size} className="relative">
        {children}
      </Container>
    </section>
  );
}
