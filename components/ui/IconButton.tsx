import { type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
import { buttonStyles, type ButtonVariant } from "./Button";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonShape = "square" | "circle";

export interface IconButtonProps extends Omit<
  ComponentPropsWithRef<"button">,
  "aria-label"
> {
  variant?: ButtonVariant;
  size?: IconButtonSize;
  /** `square` follows the control radius; `circle` is for media controls. */
  shape?: IconButtonShape;
  onDeep?: boolean;
  /** Required: an icon-only button must still announce its purpose. */
  "aria-label": string;
}

// md and lg meet the 44px touch-target guidance; sm is for dense toolbars.
const sizeStyles: Record<IconButtonSize, string> = {
  sm: "size-9",
  md: "size-11",
  lg: "size-14",
};

export function IconButton({
  variant = "ghost",
  size = "md",
  shape = "square",
  onDeep,
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        buttonStyles({ variant, onDeep }),
        "shrink-0 gap-0 px-0",
        variant === "ghost" && !onDeep && "text-content-primary",
        sizeStyles[size],
        shape === "circle" && "rounded-full",
        className,
      )}
      {...props}
    />
  );
}
