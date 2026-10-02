import { SpecularButton } from "@/components/ui/SpecularButton";
import { Section } from "@/components/ui/Section";
import {
  EventDateTimeline,
  type EventDateTimelineItem,
} from "@/components/events/EventDateTimeline";
import { SERIES_NAME } from "@/lib/site/config";
import { SectionHeading } from "./SectionHeading";

export interface EventTimelineSectionProps {
  items: EventDateTimelineItem[];
}

export function EventTimelineSection({ items }: EventTimelineSectionProps) {
  return (
    <Section id="schedule" spacing="md" aria-labelledby="schedule-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col items-start gap-8 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading
            id="schedule-title"
            eyebrow="Sneak peek"
            title="Upcoming highlights."
            description="A glimpse of what's happening. Explore the full schedule for more."
          />
          <SpecularButton href="/events" variant="secondary" arrow>
            See all events
          </SpecularButton>
        </div>
        <div className="lg:col-span-8">
          <EventDateTimeline
            items={items}
            label={`Upcoming ${SERIES_NAME} events`}
          />
        </div>
      </div>
    </Section>
  );
}
