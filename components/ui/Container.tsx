import { type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article" | "header" | "footer";
}

export function Container({ as = "div", className, ...props }: ContainerProps) {
  const Component = as as ElementType;
  return <Component className={cn("container-page", className)} {...props} />;
}
