import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "error";

const variants: Record<
  AlertVariant,
  { icon: LucideIcon; surface: string; ink: string }
> = {
  info: {
    icon: Info,
    surface: "bg-status-info-surface",
    ink: "text-status-info",
  },
  success: {
    icon: CircleCheck,
    surface: "bg-status-success-surface",
    ink: "text-status-success",
  },
  warning: {
    icon: TriangleAlert,
    surface: "bg-status-warning-surface",
    ink: "text-status-warning",
  },
  error: {
    icon: CircleAlert,
    surface: "bg-status-error-surface",
    ink: "text-status-error",
  },
};

export interface AlertProps {
  variant?: AlertVariant;
  title: ReactNode;
  children?: ReactNode;
  /** Optional trailing action, e.g. a text Button. */
  action?: ReactNode;
  className?: string;
}

/**
 * Inline, persistent message. `error` uses role="alert" (interrupts); the
 * rest use role="status" (polite). Meaning is always carried by icon + text,
 * never by color alone.
 */
export function Alert({
  variant = "info",
  title,
  children,
  action,
  className,
}: AlertProps) {
  const { icon: Icon, surface, ink } = variants[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-card flex items-start gap-3.5 p-4 sm:p-5",
        surface,
        className,
      )}
    >
      <Icon
        className={cn("mt-0.5 size-5 shrink-0", ink)}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="type-label text-content-primary">{title}</p>
        {children && (
          <div className="type-body-sm text-content-secondary">{children}</div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
