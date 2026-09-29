import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { controlStyles, describedBy, FieldShell } from "./FieldShell";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
}

export function Textarea({
  id,
  label,
  hint,
  error,
  optional,
  required,
  rows = 4,
  className,
  ...props
}: TextareaProps) {
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
      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, hint, error)}
        className={cn(
          controlStyles,
          "min-h-32 resize-y py-3.5 leading-relaxed",
        )}
        {...props}
      />
    </FieldShell>
  );
}
