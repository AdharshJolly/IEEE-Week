import { CircleAlert, CircleCheck, Info, type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "info" | "success" | "error";

const icons: Record<ToastVariant, { icon: LucideIcon; ink: string }> = {
  info: { icon: Info, ink: "text-content-on-deep-accent" },
  success: { icon: CircleCheck, ink: "text-content-on-deep-accent" },
  error: { icon: CircleAlert, ink: "text-brand-orange" },
};

export interface ToastProps {
  variant?: ToastVariant;
  title: ReactNode;
  description?: ReactNode;
  /** e.g. an "Undo" text button. Rendered on the navy surface: pass onDeep. */
  action?: ReactNode;
  className?: string;
}

/**
 * Presentational toast. Transient feedback is deliberately the one place the
 * system uses navy at small scale: it has to stand apart from any page tint.
 * Mount inside a `<div aria-live="polite">` region that outlives the toast;
 * the toast itself must not steal focus.
 */
export function Toast({
  variant = "info",
  title,
  description,
  action,
  className,
}: ToastProps) {
  const { icon: Icon, ink } = icons[variant];
  return (
    <div
      data-surface="deep"
      role="status"
      className={cn(
        "rounded-card bg-surface-deep text-content-on-deep shadow-overlay flex w-full max-w-md animate-[toast-in_var(--duration-slow)_var(--ease-emphasis)_both] items-start gap-3.5 p-4",
        className,
      )}
    >
      <Icon
        className={cn("mt-0.5 size-5 shrink-0", ink)}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="type-label">{title}</p>
        {description && (
          <p className="type-body-sm text-content-on-deep-secondary">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
