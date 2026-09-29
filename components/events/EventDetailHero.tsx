import { CalendarDays, CircleDot, Users } from "lucide-react";
import { type CSSProperties } from "react";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";
import { EventMeta } from "./EventMeta";

export interface EventDetailHeroProps {
  title: string;
  /** Full date text, e.g. "13–14 Nov". */
  dateLabel: string;
  /** Day and month for the oversized date mark. */
  day: string;
  month: string;
  societyNames: string[];
  statusLabel: string;
  tentative: boolean;
  breadcrumbs: BreadcrumbItem[];
}

/** Event page opener: oversized date, title, and a facts panel. Data-only. */
export function EventDetailHero({
  title,
  dateLabel,
  day,
  month,
  societyNames,
  statusLabel,
  tentative,
  breadcrumbs,
}: EventDetailHeroProps) {
  return (
    <Section
      spacing="none"
      className="pb-section-sm pt-6 lg:pt-8"
      aria-labelledby="event-title"
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
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-end">
        <Breadcrumbs items={breadcrumbs} className="lg:col-span-12" />

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <div className="rise-in flex items-baseline gap-3">
            <span className="font-display text-content-brand text-6xl leading-none font-bold tracking-tight tabular-nums sm:text-7xl">
              {day}
            </span>
            <Eyebrow>{month}</Eyebrow>
          </div>
          <Heading
            as="h1"
            id="event-title"
            visualStyle="h1"
            className="rise-in text-balance"
            style={{ "--i": 1 } as CSSProperties}
          >
            {title}
          </Heading>
        </div>

        <div
          className="rise-in bg-surface-elevated border-line rounded-card shadow-raised flex flex-col gap-5 border p-6 lg:col-span-5"
          style={{ "--i": 2 } as CSSProperties}
        >
          <Badge
            variant={tentative ? "outline" : "success"}
            dot
            className="self-start"
          >
            {statusLabel}
          </Badge>
          <EventMeta
            layout="stack"
            items={[
              { icon: CalendarDays, label: "Date", value: dateLabel },
              {
                icon: Users,
                label: "Organised by",
                value: (
                  <ul className="m-0 flex list-none flex-col gap-1 p-0">
                    {societyNames.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                ),
              },
              { icon: CircleDot, label: "Status", value: statusLabel },
            ]}
          />
          {tentative && (
            <Text visualStyle="body-sm" tone="tertiary">
              Dates and details are tentative and may change.
            </Text>
          )}
        </div>
      </div>
    </Section>
  );
}
