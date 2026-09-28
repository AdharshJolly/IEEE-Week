import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-medium " +
  "transition-colors duration-normal ease-standard rounded-md disabled:pointer-events-none " +
  "disabled:bg-interactive-disabled disabled:text-interactive-disabled-text";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-interactive-primary text-content-on-brand hover:bg-interactive-primary-hover active:bg-interactive-primary-active",
  secondary:
    "bg-surface text-content-primary border border-border hover:bg-interactive-secondary-hover",
  ghost:
    "bg-transparent text-content-primary hover:bg-interactive-secondary-hover",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-body-sm",
  md: "h-10 px-5 text-body-sm",
  lg: "h-12 px-6 text-body-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
