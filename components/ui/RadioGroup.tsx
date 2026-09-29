import { CircleAlert } from "lucide-react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: ReactNode;
  /** Shared `name` so the group works in a native form and with react-hook-form. */
  name: string;
  options: RadioOption[];
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Controlled value; pair with `onChange`. */
  value?: string;
  onChange?: (value: string) => void;
  /** `stack`, `row`, or `cards` (selectable tiles). */
  layout?: "stack" | "row" | "cards";
  required?: boolean;
  error?: ReactNode;
  hint?: ReactNode;
  className?: string;
}

/** Native radios inside a `<fieldset>`: arrow-key navigation comes from the browser. */
export function RadioGroup({
  label,
  name,
  options,
  defaultValue,
  value,
  onChange,
  layout = "stack",
  required,
  error,
  hint,
  className,
}: RadioGroupProps) {
  const baseId = useId();
  const cards = layout === "cards";
  const describedBy =
    [error && `${baseId}-error`, hint && `${baseId}-hint`]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <fieldset
      className={cn("m-0 min-w-0 border-0 p-0", className)}
      aria-describedby={describedBy}
    >
      <legend className="type-body-sm text-content-primary mb-2 p-0 font-semibold">
        {label}
        {required && (
          <span className="text-content-accent ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div
        className={cn(
          layout === "row" && "flex flex-wrap gap-x-6 gap-y-1",
          layout === "stack" && "flex flex-col",
          cards && "grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-3",
        )}
      >
        {options.map((option) => {
          const inputId = `${baseId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                "flex min-h-11 cursor-pointer items-start gap-3",
                cards
                  ? "border-line-control bg-surface-default hover:border-content-muted has-checked:border-interactive-primary has-checked:bg-surface-brand duration-fast ease-standard rounded-control border p-4 transition-colors"
                  : "py-2.5",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                id={inputId}
                type="radio"
                name={name}
                value={option.value}
                required={required}
                disabled={option.disabled}
                {...(value !== undefined
                  ? { checked: value === option.value }
                  : { defaultChecked: defaultValue === option.value })}
                {...(onChange && { onChange: () => onChange(option.value) })}
                className={cn(
                  "border-line-control bg-surface-default checked:border-interactive-primary duration-fast ease-standard mt-0.5 size-5.5 shrink-0 cursor-pointer appearance-none rounded-full border transition-[border-width,border-color] checked:border-6",
                  "hover:border-content-primary disabled:cursor-not-allowed",
                  Boolean(error) && "border-status-error",
                )}
              />
              <span className="flex flex-col gap-0.5">
                <span className="type-body text-content-primary leading-snug font-medium">
                  {option.label}
                </span>
                {option.description && (
                  <span className="type-body-sm text-content-muted">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p
          id={`${baseId}-error`}
          role="alert"
          className="type-body-sm text-status-error mt-2 flex items-start gap-1.5 font-medium"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
      {hint && (
        <p
          id={`${baseId}-hint`}
          className="type-body-sm text-content-muted mt-2"
        >
          {hint}
        </p>
      )}
    </fieldset>
  );
}
