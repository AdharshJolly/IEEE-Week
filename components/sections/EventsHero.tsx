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
      <div className="grid items-end gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <Eyebrow className="rise-in">{organization}</Eyebrow>
          <Heading
            as="h1"
            id="events-title"
            visualStyle="display"
            className="rise-in"
            style={{ "--i": 1 } as CSSProperties}
          >
            Events
            <br />
            <em>{year}</em>
          </Heading>
          {(dateRange || note) && (
            <Text
              visualStyle="body-lg"
              tone="secondary"
              className="rise-in max-w-xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              {dateRange && (
                <>
                  Running <strong>{dateRange}</strong>, in date order.{" "}
                </>
              )}
              {note}
            </Text>
          )}
        </div>
        <dl
          className="rise-in border-line m-0 grid grid-cols-3 gap-4 border-t pt-6 lg:col-span-5"
          style={{ "--i": 2 } as CSSProperties}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dd className="font-display text-content-primary m-0 text-4xl leading-none font-bold tracking-tight tabular-nums sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="type-eyebrow text-content-tertiary">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
