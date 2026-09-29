import { Check, Mail, Phone, Search, type LucideIcon } from "lucide-react";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { controlStyles, describedBy, FieldShell } from "./FieldShell";

const defaultIcons: Partial<Record<string, LucideIcon>> = {
  email: Mail,
  tel: Phone,
  search: Search,
};

export interface TextFieldProps extends Omit<
  ComponentPropsWithRef<"input">,
  "prefix"
> {
  label?: ReactNode;
  hint?: ReactNode;
  /** Error message; also sets the invalid state. */
  error?: ReactNode;
  /** Shows a valid state (check icon + green border). */
  success?: boolean;
  optional?: boolean;
  /** Leading icon. Defaults by `type` (email, tel, search); `null` hides it. */
  icon?: LucideIcon | null;
  /** Mono text prefix, e.g. "+91". Replaces the icon. */
  prefixText?: string;
}

export function TextField({
  id,
  label,
  hint,
  error,
  success,
  optional,
  required,
  icon,
  prefixText,
  type = "text",
  className,
  ...props
}: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const Icon = icon === null ? undefined : (icon ?? defaultIcons[type]);
  const lead = prefixText ? true : Boolean(Icon);

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
        {prefixText ? (
          <span className="type-meta text-content-secondary pointer-events-none absolute left-4">
            {prefixText}
          </span>
        ) : (
          Icon && (
            <Icon
              className="text-content-muted pointer-events-none absolute left-4 size-5"
              aria-hidden="true"
            />
          )
        )}
        <input
          id={fieldId}
          type={type}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cn(
            controlStyles,
            "h-13",
            lead && (prefixText ? "pl-14" : "pl-12"),
            success && !error && "border-status-success",
            success && !error && "pr-12",
          )}
          {...props}
        />
        {success && !error && (
          <Check
            className="text-status-success pointer-events-none absolute right-4 size-5"
            aria-hidden="true"
          />
        )}
      </div>
    </FieldShell>
  );
}
