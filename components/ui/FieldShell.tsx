import { CircleAlert } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared control styling for text-like inputs, selects and textareas. */
export const controlStyles =
  "w-full rounded-control border border-line-control bg-surface-default px-4 type-body text-content-primary " +
  "placeholder:text-content-muted transition-[border-color,box-shadow] duration-fast ease-standard " +
  "hover:border-content-muted focus:border-interactive-focus focus:ring-4 focus:ring-interactive-focus/20 focus-visible:outline-none " +
  "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-interactive-disabled disabled:text-interactive-disabled-content " +
  "aria-invalid:border-status-error aria-invalid:focus:ring-status-error/20";

export interface FieldShellProps {
  /** id of the control; hint/error ids derive from it via `describedBy`. */
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

export function describedBy(id: string, hint: ReactNode, error: ReactNode) {
  const ids = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/** Label + control + hint/error, wired for assistive tech. */
export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  optional,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="type-body-sm text-content-primary flex items-baseline justify-between gap-2 font-semibold"
        >
          <span>
            {label}
            {required && (
              <span className="text-content-accent ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </span>
          {optional && (
            <span className="text-content-muted type-body-sm font-normal">
              Optional
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="type-body-sm text-status-error flex items-start gap-1.5 font-medium"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      {hint && (
        <p id={`${id}-hint`} className="type-body-sm text-content-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
