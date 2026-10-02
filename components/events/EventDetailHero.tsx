import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumbs";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SignalField } from "@/components/motion/SignalLine";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { Text } from "@/components/ui/Text";
import { delay } from "@/lib/motion/tokens";
import type { EventCategory } from "@/types/event";
import { AddToCalendarButton } from "./AddToCalendarButton";
import { CATEGORIES } from "./CategoryTag";

export interface EventDetailHeroProps {
  title: string;
  /** Full date text, e.g. "13–14 Nov". */
  dateLabel: string;
  /** Day and month for the oversized date mark. */
  day: string;
  month: string;
  /** 1-based position in the series, shown as "03". */
  index?: number;
  category?: EventCategory;
  societyNames: string[];
  statusLabel: string;
  tentative: boolean;
  breadcrumbs: BreadcrumbItem[];
}

/**
 * Head of a technical document: index and category line, display title that
 * wraps at any length, then a ruled spec sheet. Data-only.
 */
export function EventDetailHero({
  title,
  dateLabel,
  day,
  month,
  index,
  category,
  societyNames,
  statusLabel,
  tentative,
  breadcrumbs,
}: EventDetailHeroProps) {
  const label = [
    index !== undefined && String(index).padStart(2, "0"),
    category && CATEGORIES[category].label,
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <Section
      spacing="none"
      className="pb-section-sm pt-6 lg:pt-8"
      aria-labelledby="event-title"
      decor={
        <>
          <Decor variant="grid" className="inset-0" />
          <SignalField className="inset-0 h-full w-full" />
        </>
      }
    >
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <Breadcrumbs items={breadcrumbs} className="lg:col-span-12" />

        <Reveal
          trigger="mount"
          direction="none"
          className="border-line flex items-baseline justify-between gap-6 border-b pb-4 lg:col-span-12"
        >
          <p className="type-tech text-content-brand">{label || "Event"}</p>
          <p className="type-tech text-content-tertiary">{dateLabel}</p>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-8 lg:col-span-8">
          <Heading
            as="h1"
            id="event-title"
            visualStyle="hero"
            className="min-w-0 text-balance [overflow-wrap:anywhere]"
          >
            <MaskedText delay={delay.title}>{title}</MaskedText>
          </Heading>
        </div>

        <Reveal
          trigger="mount"
          direction="none"
          className="flex items-baseline gap-3 lg:col-span-4 lg:justify-end"
        >
          <span className="type-numeral text-content-brand">{day}</span>
          <span className="type-tech text-content-tertiary">{month}</span>
        </Reveal>

        <Stagger
          trigger="mount"
          delay={delay.title + delay.afterTitle}
          className="flex flex-col gap-6 lg:col-span-8"
        >
          <StaggerItem>
            <SpecList
              items={[
                { label: "Date", value: dateLabel },
                {
                  label: "Organised by",
                  value: (
                    <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
                      {societyNames.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  ),
                },
                { label: "Status", value: statusLabel },
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
          <StaggerItem>
            <AddToCalendarButton title={title} />
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  );
}
