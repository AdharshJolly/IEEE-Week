import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Add to a field's `className` to span both columns of a FormSection. */
export const fieldSpanFull = "sm:col-span-2";

export interface FormSectionProps {
  /** Mono step marker, e.g. "01 / 03". */
  step?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `split`: heading beside fields from `lg`. `stacked`: heading above. */
  layout?: "split" | "stacked";
  id: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  step,
  title,
  description,
  layout = "split",
  id,
  children,
  className,
}: FormSectionProps) {
  const split = layout === "split";
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(
        "border-line grid gap-6 border-t py-10 first:border-t-0 first:pt-0",
        split && "lg:grid-cols-12",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-2", split && "lg:col-span-4")}>
        {step && (
          <p className="type-meta text-content-brand font-semibold">{step}</p>
        )}
        <h2 id={`${id}-title`} className="type-h3">
          {title}
        </h2>
        {description && (
          <p className="type-body-sm text-content-secondary">{description}</p>
        )}
      </div>
      <div
        className={cn("grid gap-5 sm:grid-cols-2", split && "lg:col-span-8")}
      >
        {children}
      </div>
    </section>
  );
}
