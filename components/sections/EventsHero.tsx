import { type CSSProperties } from "react";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export interface EventsHeroStat {
  value: string;
  label: string;
}

export interface EventsHeroProps {
  organization: string;
  year: string;
  /** Derived from data, e.g. "11–18 Nov". */
  dateRange?: string;
  stats: EventsHeroStat[];
  note?: string;
}

/** Events index opener: title, data-derived context, and key counts. */
export function EventsHero({
  organization,
  year,
  dateRange,
  stats,
  note,
}: EventsHeroProps) {
  return (
    <Section
      spacing="none"
      className="pb-12 pt-6 lg:pt-10 px-3 sm:px-5"
      aria-labelledby="events-title"
      container={false} // We will handle max-w inside to allow the banner to stretch if needed
    >
      <div className="relative max-w-[calc(var(--page-max)+2*var(--gutter))] mx-auto w-full overflow-hidden rounded-[2.5rem] border border-line bg-surface-elevated px-6 py-16 sm:px-12 sm:py-24 text-center shadow-float">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0">
          <Decor variant="grid" className="inset-0 opacity-50" />
          <Decor
            variant="rings-cyan"
            at="50% -20%"
            className="top-0 left-1/2 -translate-x-1/2 h-[60rem] w-[60rem] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-elevated" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="rise-in inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              {organization} {year}
            </span>
          </div>

          <Heading
            as="h1"
            id="events-title"
            visualStyle="display"
            className="rise-in max-w-3xl text-balance"
            style={{ "--i": 1 } as CSSProperties}
          >
            Discover Tech <br className="hidden sm:block" />
            <em className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
              Events & Summits
            </em>
          </Heading>

          {(dateRange || note) && (
            <Text
              visualStyle="body-lg"
              tone="secondary"
              className="rise-in max-w-xl text-balance mt-2"
              style={{ "--i": 2 } as CSSProperties}
            >
              {dateRange && (
                <>
                  Join us from <strong>{dateRange}</strong>.{" "}
                </>
              )}
              {note}
            </Text>
          )}

          {/* Floating Stats Bar */}
          <div 
            className="rise-in mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 rounded-2xl border border-line bg-surface-deep/40 px-8 py-6 backdrop-blur-lg shadow-raised"
            style={{ "--i": 3 } as CSSProperties}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 min-w-[5rem]">
                <span className="font-display text-3xl sm:text-4xl font-bold text-content-brand tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-content-tertiary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
