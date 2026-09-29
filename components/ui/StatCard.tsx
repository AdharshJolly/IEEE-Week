import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatTone = "plain" | "tint" | "brand" | "deep";

const toneStyles: Record<StatTone, string> = {
  plain: "text-content-primary",
  tint: "rounded-card bg-surface-brand p-6 text-content-primary sm:p-7",
  brand: "rounded-card bg-interactive-primary p-6 text-content-on-brand sm:p-7",
  deep: "rounded-card bg-surface-deep p-6 text-content-on-deep sm:p-7",
};

export interface StatCardProps {
  value: ReactNode;
  /** Small suffix, e.g. "+". */
  suffix?: string;
  label: ReactNode;
  detail?: ReactNode;
  /** Numbers breathe on the page by default; add a panel only for emphasis. */
  tone?: StatTone;
  className?: string;
}

export function StatCard({
  value,
  suffix,
  label,
  detail,
  tone = "plain",
  className,
}: StatCardProps) {
  const onFill = tone === "brand" || tone === "deep";
  return (
    <div
      data-surface={tone === "deep" ? "deep" : undefined}
      className={cn("flex flex-col gap-2", toneStyles[tone], className)}
    >
      <p className="font-display text-[clamp(3rem,2.2rem+3vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.04em] tabular-nums">
        {value}
        {suffix && (
          <span
            className={cn(
              "ml-1 align-top text-[0.5em] tracking-normal",
              tone === "deep" && "text-content-on-deep-accent",
              tone === "plain" && "text-content-brand",
              tone === "tint" && "text-content-brand",
            )}
          >
            {suffix}
          </span>
        )}
      </p>
      <p className="type-label mt-1">{label}</p>
      {detail && (
        <p
          className={cn(
            "type-body-sm",
            onFill ? "opacity-85" : "text-content-secondary",
          )}
        >
          {detail}
        </p>
      )}
    </div>
  );
}
