import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export interface GlanceDay {
  /** ISO date, used as key. */
  id: string;
  day: number;
  /** Number of events running on this day. */
  eventCount: number;
  /** Accessible label, e.g. "13 Nov: 1 event". */
  label: string;
}

export interface WeekAtAGlanceProps {
  stats: { value: string; label: string; detail?: string }[];
  days: GlanceDay[];
  month: string;
  note?: string;
}

/** Derived facts only: every figure here is computed from the event data. */
export function WeekAtAGlance({
  stats,
  days,
  month,
  note,
}: WeekAtAGlanceProps) {
  return (
    <Section tone="subtle" spacing="sm" aria-labelledby="glance-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading
            id="glance-title"
            eyebrow="Week at a glance"
            title="One week, several societies."
          />
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7 lg:pt-3">
          <p className="type-meta text-content-tertiary">{month}</p>
          <ol className="m-0 grid list-none grid-cols-4 gap-2 p-0 sm:grid-cols-8">
            {days.map((day) => {
              const active = day.eventCount > 0;
              return (
                <li
                  key={day.id}
                  aria-label={day.label}
                  className={cn(
                    "rounded-card flex aspect-square flex-col items-center justify-center gap-1.5 border",
                    active
                      ? "bg-interactive-primary text-content-on-brand border-transparent"
                      : "border-line bg-surface-default text-content-tertiary",
                  )}
                >
                  <span className="font-display text-2xl leading-none font-bold tabular-nums">
                    {day.day}
                  </span>
                  <span className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: day.eventCount }, (_, i) => (
                      <span
                        key={i}
                        className="bg-brand-cyan size-1.5 rounded-full"
                      />
                    ))}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="type-caption text-content-secondary">
            Filled days have at least one event; dots count the events running
            that day.
            {note && ` ${note}`}
          </p>
        </div>
      </div>
    </Section>
  );
}
