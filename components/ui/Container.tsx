import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "nav";
  /**
   * `default` 1280px, `wide` 1472px for full-bleed editorial compositions,
   * `narrow` 736px for prose and forms. Gutters scale fluidly with viewport.
   */
  size?: "default" | "wide" | "narrow";
}

export function Container({
  as = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  const Component = as as ElementType;
  return (
    <Component
      className={cn(
        "container-page",
        size === "wide" && "container-wide",
        size === "narrow" && "container-narrow",
        className,
      )}
      {...props}
    />
  );
}
