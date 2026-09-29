import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  EventDateTimeline,
  type EventDateTimelineItem,
} from "@/components/events/EventDateTimeline";
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
            eyebrow="Event timeline"
            title="What happens, and when."
            description="The current plan, in date order. Open any event for its dedicated page."
          />
          <Button href="/events" variant="outline" arrow>
            All events
          </Button>
        </div>
        <div className="lg:col-span-8">
          <EventDateTimeline items={items} label="IEEE Week events by date" />
        </div>
      </div>
    </Section>
  );
}
