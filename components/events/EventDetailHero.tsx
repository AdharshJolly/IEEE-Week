import { CalendarDays, CircleDot, Users } from "lucide-react";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumbs";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SignalField } from "@/components/motion/SignalLine";
import { Badge } from "@/components/ui/Badge";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";
import { delay } from "@/lib/motion/tokens";
import { AddToCalendarButton } from "./AddToCalendarButton";
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
          <SignalField className="inset-0 h-full w-full" />
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
          <Reveal
            trigger="mount"
            direction="none"
            className="flex items-baseline gap-3"
          >
            <span className="font-display text-content-brand text-6xl leading-none font-bold tracking-tight tabular-nums sm:text-7xl">
              {day}
            </span>
            <Eyebrow>{month}</Eyebrow>
          </Reveal>
          <Heading
            as="h1"
            id="event-title"
            visualStyle="h1"
            className="text-balance [overflow-wrap:anywhere]"
          >
            <MaskedText delay={delay.title}>{title}</MaskedText>
          </Heading>
        </div>

        <Stagger
          trigger="mount"
          delay={delay.title + delay.afterTitle}
          className="bg-surface-elevated border-line rounded-card shadow-raised flex flex-col gap-5 border p-6 lg:col-span-5"
        >
          <StaggerItem className="self-start">
            <Badge variant={tentative ? "outline" : "success"} dot>
              {statusLabel}
            </Badge>
          </StaggerItem>
          <StaggerItem>
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
          </StaggerItem>
          {tentative && (
            <StaggerItem>
              <Text visualStyle="body-sm" tone="tertiary">
                Dates and details are tentative and may change.
              </Text>
            </StaggerItem>
          )}

          <StaggerItem className="pt-2">
            <AddToCalendarButton title={title} />
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  );
}
