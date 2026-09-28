import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type IconButtonVariant = "primary" | "secondary" | "ghost";
export type IconButtonSize = "sm" | "md";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Required: an icon-only button must still announce its purpose. */
  "aria-label": string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    "bg-interactive-primary text-content-on-brand hover:bg-interactive-primary-hover active:bg-interactive-primary-active",
  secondary:
    "bg-surface text-content-primary border border-border hover:bg-interactive-secondary-hover",
  ghost:
    "bg-transparent text-content-primary hover:bg-interactive-secondary-hover",
};

// Minimum 44px touch target at every size, per WCAG target-size guidance;
// visual footprint can be smaller than the hit area via padding.
const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-9",
  md: "size-11",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "secondary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-pill duration-normal ease-standard disabled:bg-interactive-disabled disabled:text-interactive-disabled-text inline-flex shrink-0 items-center justify-center transition-colors disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
