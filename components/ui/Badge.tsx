import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "brand"
  | "accent"
  | "special"
  | "highlight"
  | "neutral"
  | "outline"
  | "deep"
  | "solid"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";

// Badges are labels, not buttons: tag radius, never pill-shaped, so the
// only rounded-full shapes in the system are avatars and dots.
const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-surface-brand text-content-brand",
  accent: "bg-surface-accent text-content-teal",
  special: "bg-surface-special text-content-accent",
  highlight: "bg-surface-highlight text-status-warning",
  neutral: "bg-surface-muted text-content-secondary",
  outline: "border-line-control bg-transparent text-content-secondary",
  deep: "bg-surface-deep text-content-on-deep",
  // Opaque, for placement over photography.
  solid: "bg-surface-elevated text-content-primary shadow-rest",
  success: "bg-status-success-surface text-status-success",
  warning: "bg-status-warning-surface text-status-warning",
  error: "bg-status-error-surface text-status-error",
  info: "bg-status-info-surface text-status-info",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-5.5 px-2 type-caption",
  md: "h-6.5 px-2.5 type-caption",
  lg: "h-8 px-3 type-body-sm",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Leading dot. Only where it carries state (live, open, closed). */
  dot?: boolean;
}

export function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-tag inline-flex items-center gap-1.5 border border-transparent leading-none font-semibold whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
