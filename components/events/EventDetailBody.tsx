import Image from "next/image";
import { type ReactNode } from "react";
import { BorderGlow } from "@/components/effects/BorderGlow";
import { Alert } from "@/components/ui/Alert";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { Text } from "@/components/ui/Text";
import type { EventDetail, EventScheduleItem } from "@/types/event";

export interface EventDetailBodyProps {
  description?: string;
  details?: EventDetail[];
  schedule?: EventScheduleItem[];
  speakers?: { name: string; role: string; avatarUrl: string }[];
  registrationUrl?: string;
  eventTitle: string;
}

/** Numbered document section: index and rule, then the heading and content. */
function DocSection({
  index,
  title,
  id,
  children,
}: {
  index: number;
  title: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="border-line grid gap-x-8 gap-y-4 border-t pt-5 md:grid-cols-[3rem_minmax(0,1fr)]"
    >
      <span aria-hidden="true" className="type-index text-content-brand pt-2">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex min-w-0 flex-col gap-5">
        <Heading as="h2" id={id} visualStyle="h2">
          {title}
        </Heading>
        {children}
      </div>
    </section>
  );
}

/**
 * Renders only what the event data supplies, as numbered sections of one
 * document. When nothing is supplied it says so plainly rather than filling
 * the page. Registration behaviour is unchanged: a link when a URL exists,
 * a plain notice otherwise.
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

  let n = 0;

  return (
    <Section spacing="md" aria-label="Event information">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="flex min-w-0 flex-col gap-12 lg:col-span-8">
          {description && (
            <DocSection index={++n} id="about-event" title="About this event">
              <Text
                visualStyle="body-lg"
                tone="secondary"
                className="max-w-prose"
              >
                {description}
              </Text>
            </DocSection>
          )}

          {hasSpeakers && (
            <DocSection index={++n} id="speakers" title="Speakers & Hosts">
              <ul className="m-0 grid list-none gap-x-8 p-0 sm:grid-cols-2">
                {speakers.map((speaker) => (
                  <li
                    key={speaker.name}
                    className="border-line m-0 flex items-center gap-4 border-t py-4"
                  >
                    <Image
                      src={speaker.avatarUrl}
                      alt=""
                      width={56}
                      height={56}
                      className="size-14 shrink-0 rounded-full object-cover"
                    />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <strong className="type-title">{speaker.name}</strong>
                      <span className="type-tech text-content-tertiary">
                        {speaker.role}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </DocSection>
          )}

          {hasSchedule && (
            <DocSection index={++n} id="schedule-list" title="Schedule">
              <ol className="m-0 list-none p-0">
                {schedule.map((item) => (
                  <li
                    key={`${item.time}-${item.title}`}
                    className="border-line m-0 grid gap-x-6 gap-y-1 border-t py-4 sm:grid-cols-[8rem_minmax(0,1fr)]"
                  >
                    <span className="type-meta text-content-brand">
                      {item.time}
                      {item.endTime && `–${item.endTime}`}
                    </span>
                    <span className="type-title">{item.title}</span>
                  </li>
                ))}
              </ol>
            </DocSection>
          )}
        </div>

        <aside
          aria-label="Details and registration"
          className="flex min-w-0 flex-col gap-10 lg:sticky lg:top-24 lg:col-span-4 lg:self-start"
        >
          {hasDetails && (
            <div className="flex flex-col gap-4">
              <Heading as="h2" visualStyle="title">
                Event details
              </Heading>
              <SpecList
                items={details.map((detail) => ({
                  label: detail.label,
                  value: detail.value,
                }))}
              />
            </div>
          )}

          {registrationUrl ? (
            <BorderGlow surface="subtle" radius="card" animated>
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <Heading as="h2" visualStyle="title">
                  Registration
                </Heading>
                <Text visualStyle="body-sm" tone="secondary">
                  Secure your spot for {eventTitle}.
                </Text>
                <SpecularButton
                  href={registrationUrl}
                  size="lg"
                  arrow
                  className="w-full justify-center"
                >
                  Register now
                </SpecularButton>
              </div>
            </BorderGlow>
          ) : (
            <div className="border-line-brand flex flex-col gap-4 border-t-2 pt-5">
              <Heading as="h2" visualStyle="title">
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
