import { type CSSProperties } from "react";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";

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
      className="pb-section-sm pt-10 lg:pt-16"
      aria-labelledby="events-title"
      decor={
        <>
          <Decor variant="grid" className="inset-0" />
          <Decor
            variant="rings-cyan"
            at="100% 0%"
            className="top-0 right-0 h-[36rem] w-[36rem]"
          />
        </>
      }
    >
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto min-h-[30vh] lg:min-h-[40vh] pt-10">
        <Eyebrow className="rise-in mb-6 justify-center before:hidden text-brand-cyan uppercase tracking-widest">{organization}</Eyebrow>
        
        <Heading
          as="h1"
          id="events-title"
          visualStyle="display"
          className="rise-in text-balance"
          style={{ "--i": 1 } as CSSProperties}
        >
          Explore the{" "}
          <em className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
            Tech Schedule
          </em>
        </Heading>

        {(dateRange || note) && (
          <Text
            visualStyle="body-lg"
            tone="secondary"
            className="rise-in max-w-2xl text-balance mt-6"
            style={{ "--i": 2 } as CSSProperties}
          >
            {dateRange && (
              <>
                Join us from <strong>{dateRange}</strong> for {year}&apos;s most anticipated tech events.{" "}
              </>
            )}
            {note}
          </Text>
        )}

        <div
          className="rise-in mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
          style={{ "--i": 3 } as CSSProperties}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className="font-display text-4xl sm:text-5xl font-bold text-content-primary tabular-nums tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="type-meta text-content-tertiary uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
