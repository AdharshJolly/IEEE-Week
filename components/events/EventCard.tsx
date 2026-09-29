import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Card, CardBody, CardFooter } from "@/components/ui/Card";
import { Photo, type PhotoAspect } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";
import type { EventCategory, RegistrationState } from "@/types/event";
import { CategoryTag, categoryTone } from "./CategoryTag";
import { EventMeta, type EventMetaItem } from "./EventMeta";
import { RegistrationStatus } from "./RegistrationStatus";

export interface EventCardProps {
  title: string;
  image?: string;
  imageAlt?: string;
  society?: string;
  category?: EventCategory;
  /** Date tile day, e.g. "14". */
  day?: string;
  /** Date tile month, e.g. "Oct". */
  month?: string;
  time?: string;
  venue?: string;
  status?: RegistrationState;
  seatsLeft?: number;
  /** Makes the whole card a link. */
  href?: string;
  /** Heading level for the title, chosen for the surrounding outline. */
  headingAs?: "h2" | "h3" | "h4";
  aspect?: PhotoAspect;
  className?: string;
}

/**
 * Photo first, then a date tile that overlaps the photo edge. The overlap is
 * the card's one layered moment; everything else stays flat and quiet.
 */
export function EventCard({
  title,
  image,
  imageAlt,
  society,
  category,
  day,
  month,
  time,
  venue,
  status,
  seatsLeft,
  href,
  headingAs: Heading = "h3",
  aspect = "4/3",
  className,
}: EventCardProps) {
  const meta: EventMetaItem[] = [];
  if (time) meta.push({ icon: Clock, label: "Time", value: time });
  if (venue) meta.push({ icon: MapPin, label: "Venue", value: venue });
  const hasTile = Boolean(day && month);

  return (
    <Card as="article" href={href} className={className}>
      <Photo
        src={image}
        alt={imageAlt}
        tone={category ? categoryTone[category] : "blue"}
        aspect={aspect}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
      />

      <CardBody className="relative gap-3.5">
        {(hasTile || category) && (
          <div
            className={cn(
              "flex min-h-7 items-start",
              hasTile ? "justify-end" : "justify-start",
            )}
          >
            {hasTile && (
              <div
                className="rounded-control bg-surface-elevated shadow-raised absolute -top-8 left-5 flex h-16 w-14 flex-col items-center justify-center text-center sm:left-6"
                aria-hidden="true"
              >
                <b className="font-display text-2xl leading-none font-bold tracking-tight">
                  {day}
                </b>
                <span className="type-eyebrow text-content-brand mt-1">
                  {month}
                </span>
              </div>
            )}
            {category && <CategoryTag category={category} size="sm" />}
          </div>
        )}
        {hasTile && (
          <span className="sr-only">
            {day} {month}
          </span>
        )}
        <div className="flex flex-col gap-1.5">
          {society && (
            <p className="type-meta text-content-tertiary">{society}</p>
          )}
          <Heading className="type-title text-balance">{title}</Heading>
        </div>
        {meta.length > 0 && <EventMeta compact layout="stack" items={meta} />}
        {(status || href) && (
          <CardFooter>
            {status ? (
              <RegistrationStatus status={status} seatsLeft={seatsLeft} plain />
            ) : (
              <span />
            )}
            {href && (
              <span className="magnetic">
                <ArrowUpRight
                  className="text-content-brand duration-base ease-emphasis size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            )}
          </CardFooter>
        )}
      </CardBody>
    </Card>
  );
}
