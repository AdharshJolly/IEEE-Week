import { Check } from "lucide-react";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type"
> {
  label: ReactNode;
  description?: ReactNode;
  error?: boolean;
}

/** Native checkbox, visually replaced by a token-styled box. */
export function Checkbox({
  id,
  label,
  description,
  error,
  className,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={cn("flex min-h-11 items-start gap-3 py-2.5", className)}>
      <span className="relative mt-0.5 size-5.5 shrink-0">
        <input
          id={inputId}
          type="checkbox"
          aria-invalid={error || undefined}
          aria-describedby={description ? `${inputId}-desc` : undefined}
          className={cn(
            "peer border-line-control bg-surface-default hover:border-content-primary checked:border-interactive-primary checked:bg-interactive-primary duration-fast ease-standard rounded-tag absolute inset-0 size-full cursor-pointer appearance-none border transition-colors",
            "aria-invalid:border-status-error disabled:cursor-not-allowed disabled:opacity-50",
          )}
          {...props}
        />
        <Check
          className="text-content-on-brand duration-fast ease-standard pointer-events-none absolute inset-0 m-auto size-3.5 scale-50 opacity-0 transition-[opacity,transform] peer-checked:scale-100 peer-checked:opacity-100"
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={inputId}
          className="type-body text-content-primary cursor-pointer leading-snug font-medium"
        >
          {label}
        </label>
        {description && (
          <p id={`${inputId}-desc`} className="type-body-sm text-content-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
