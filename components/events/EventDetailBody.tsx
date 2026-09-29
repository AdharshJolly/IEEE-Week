import { CalendarClock } from "lucide-react";
import Image from "next/image";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
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
  speakers?: { name: string; role: string; avatarUrl: string }[];
  registrationUrl?: string;
  eventTitle: string;
}

/**
 * Renders only what the event data supplies. When nothing is supplied it says
 * so plainly rather than filling the page.
 */
export function EventDetailBody({
  description,
  details,
  schedule,
  speakers,
  registrationUrl,
  eventTitle,
}: EventDetailBodyProps) {
  const hasDetails = details && details.length > 0;
  const hasSchedule = schedule && schedule.length > 0;
  const hasSpeakers = speakers && speakers.length > 0;

  if (!description && !hasDetails && !hasSchedule && !hasSpeakers) {
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
          
          {hasSpeakers && (
            <div className="flex flex-col gap-6">
              <Heading as="h2" visualStyle="h2">
                Speakers & Hosts
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {speakers.map((speaker) => (
                  <div key={speaker.name} className="flex items-center gap-4 bg-surface-elevated rounded-card p-4 border border-line shadow-rest">
                    <Image src={speaker.avatarUrl} alt={speaker.name} width={64} height={64} className="size-16 rounded-full object-cover shrink-0" />
                    <div className="flex flex-col">
                      <strong className="type-title text-base">{speaker.name}</strong>
                      <span className="type-body-sm text-content-secondary">{speaker.role}</span>
                    </div>
                  </div>
                ))}
              </div>
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
        <aside aria-labelledby="details-title" className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col gap-6">
          {hasDetails && (
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
          )}
          
          {registrationUrl ? (
            <div className="bg-surface-brand text-content-brand rounded-card flex flex-col gap-5 p-6 shadow-float">
              <Heading as="h3" visualStyle="title">
                Registration
              </Heading>
              <Text visualStyle="body-sm">
                Secure your spot for {eventTitle}. 
              </Text>
              <Button href={registrationUrl} size="lg" arrow className="w-full justify-center">
                Register now
              </Button>
            </div>
          ) : (
            <div className="bg-surface-elevated border-line rounded-card flex flex-col gap-4 p-6 shadow-rest border">
              <Heading as="h3" visualStyle="title">
                Registration
              </Heading>
              <Text visualStyle="body-sm" tone="secondary">
                Registration details for this event have not been announced yet.
              </Text>
            </div>
          )}
        </aside>
      </div>
    </Section>
  );
}
