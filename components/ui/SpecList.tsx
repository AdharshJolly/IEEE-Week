import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SpecItem {
  label: string;
  value: ReactNode;
}

export interface SpecListProps {
  items: SpecItem[];
  /** Use on navy (`deep`) surfaces. */
  onDeep?: boolean;
  className?: string;
}

/**
 * Metadata as a ruled spec sheet: mono label, value, hairline between rows.
 * Replaces boxed "facts" panels. Stacks on narrow screens, two columns from
 * `sm`, so long values never get cramped.
 */
export function SpecList({ items, onDeep = false, className }: SpecListProps) {
  return (
    <dl
      className={cn(
        "m-0 flex flex-col border-t p-0",
        onDeep ? "border-line-on-deep" : "border-line",
        className,
      )}
    >
      {items.map(({ label, value }) => (
        <div
          key={label}
          className={cn(
            "grid gap-x-6 gap-y-1 border-b py-3.5 sm:grid-cols-[8rem_minmax(0,1fr)]",
            onDeep ? "border-line-on-deep" : "border-line",
          )}
        >
          <dt
            className={cn(
              "type-tech pt-0.5",
              onDeep
                ? "text-content-on-deep-secondary"
                : "text-content-tertiary",
            )}
          >
            {label}
          </dt>
          <dd className="type-body-sm m-0 min-w-0 [overflow-wrap:anywhere]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
