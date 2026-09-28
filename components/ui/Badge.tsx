import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  "brand" | "neutral" | "success" | "warning" | "error" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-brand-primary text-content-on-brand",
  neutral: "bg-surface-sunken text-content-secondary",
  success: "bg-status-success-surface text-status-success",
  warning: "bg-status-warning-surface text-status-warning",
  error: "bg-status-error-surface text-status-error",
  info: "bg-status-info-surface text-status-info",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "text-caption rounded-pill inline-flex items-center px-3 py-1",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
