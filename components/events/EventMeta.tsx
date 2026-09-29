import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EventMetaItem {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
}

export interface EventMetaProps {
  items: EventMetaItem[];
  layout?: "row" | "stack" | "grid";
  /** Inline icon + value only; labels stay available to screen readers. */
  compact?: boolean;
  /** Use on navy (`deep`) surfaces. */
  onDeep?: boolean;
  className?: string;
}

const layoutStyles = {
  row: "flex flex-wrap gap-x-6 gap-y-3",
  stack: "flex flex-col gap-3",
  grid: "grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-x-6 gap-y-5",
};

export function EventMeta({
  items,
  layout = "row",
  compact = false,
  onDeep = false,
  className,
}: EventMetaProps) {
  return (
    <dl className={cn("m-0 p-0", layoutStyles[layout], className)}>
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex min-w-0 items-start gap-2.5">
          <span
            className={cn(
              "flex shrink-0 items-center justify-center",
              compact
                ? cn(
                    "pt-0.5",
                    onDeep
                      ? "text-content-on-deep-accent"
                      : "text-content-brand",
                  )
                : cn(
                    "rounded-control size-9",
                    onDeep
                      ? "bg-content-on-deep/10 text-content-on-deep-accent"
                      : "bg-surface-brand text-content-brand",
                  ),
            )}
          >
            <Icon
              className={compact ? "size-4" : "size-[1.125rem]"}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
          <div className="min-w-0">
            <dt
              className={cn(
                compact
                  ? "sr-only"
                  : cn(
                      "type-eyebrow mb-1",
                      onDeep
                        ? "text-content-on-deep-secondary"
                        : "text-content-tertiary",
                    ),
              )}
            >
              {label}
            </dt>
            <dd
              className={cn(
                "m-0 leading-snug",
                compact
                  ? cn(
                      "type-body-sm font-medium",
                      onDeep
                        ? "text-content-on-deep-secondary"
                        : "text-content-secondary",
                    )
                  : cn(
                      "type-body font-semibold",
                      onDeep ? "text-content-on-deep" : "text-content-primary",
                    ),
              )}
            >
              {value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
