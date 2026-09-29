import { ChevronDown } from "lucide-react";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { controlStyles, describedBy, FieldShell } from "./FieldShell";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends ComponentPropsWithRef<"select"> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
  options: SelectOption[];
  /** Non-selectable first option, e.g. "Choose a society". */
  placeholder?: string;
}

/** Native `<select>` - full keyboard and mobile picker support for free. */
export function Select({
  id,
  label,
  hint,
  error,
  optional,
  required,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      error={error}
      required={required}
      optional={optional}
      className={className}
    >
      <div className="relative flex items-center">
        <select
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cn(
            controlStyles,
            "h-13 cursor-pointer appearance-none pr-11",
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="text-content-muted pointer-events-none absolute right-4 size-5"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}
