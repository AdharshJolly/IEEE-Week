import { CalendarClock } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { EventDetail, EventScheduleItem } from "@/types/event";
import { EventMeta } from "./EventMeta";
import { ScheduleCard } from "./ScheduleCard";

export interface EventDetailBodyProps {
  description?: string;
  details?: EventDetail[];
  schedule?: EventScheduleItem[];
}

/**
 * Renders only what the event data supplies. When nothing is supplied it says
 * so plainly rather than filling the page.
 */
export function EventDetailBody({
  description,
  details,
  schedule,
}: EventDetailBodyProps) {
  const hasDetails = details && details.length > 0;
  const hasSchedule = schedule && schedule.length > 0;

  if (!description && !hasDetails && !hasSchedule) {
    return (
      <Section spacing="sm" aria-label="Event information">
        <Alert variant="info" title="More information coming soon">
          The description, schedule and other details for this event have not
          been published yet.
        </Alert>
      </Section>
    );
  }

  return (
    <Section spacing="md" aria-label="Event information">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-12 lg:col-span-7">
          {description && (
            <div className="flex flex-col gap-4">
              <Heading as="h2" visualStyle="h2">
                About this event
              </Heading>
              <Text visualStyle="body-lg" tone="secondary">
                {description}
              </Text>
            </div>
          )}
          {hasSchedule && (
            <div className="flex flex-col gap-5">
              <Heading as="h2" visualStyle="h2">
                Schedule
              </Heading>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {schedule.map((item) => (
                  <li key={`${item.time}-${item.title}`} className="m-0">
                    <ScheduleCard
                      time={item.time}
                      endTime={item.endTime}
                      title={item.title}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {hasDetails && (
          <aside aria-labelledby="details-title" className="lg:col-span-5">
            <div className="bg-surface-subtle rounded-card flex flex-col gap-5 p-6">
              <Heading as="h2" id="details-title" visualStyle="title">
                Event details
              </Heading>
              <EventMeta
                layout="stack"
                items={details.map((detail) => ({
                  icon: CalendarClock,
                  label: detail.label,
                  value: detail.value,
                }))}
              />
            </div>
          </aside>
        )}
      </div>
    </Section>
  );
}
