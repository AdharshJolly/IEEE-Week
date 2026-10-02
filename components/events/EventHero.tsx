import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { type CSSProperties, type ReactNode } from "react";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/navigation/Breadcrumbs";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Text } from "@/components/ui/Text";
import type { EventCategory, RegistrationState } from "@/types/event";
import { CategoryTag, categoryTone } from "./CategoryTag";
import { EventMeta, type EventMetaItem } from "./EventMeta";
import { RegistrationStatus } from "./RegistrationStatus";

export interface EventHeroAction {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface EventHeroProps {
  title: string;
  description?: ReactNode;
  image?: string;
  imageAlt?: string;
  society?: string;
  category?: EventCategory;
  date?: string;
  time?: string;
  venue?: string;
  status?: RegistrationState;
  seatsLeft?: number;
  /** e.g. "Free for IEEE members". */
  fee?: string;
  primaryAction?: EventHeroAction;
  secondaryAction?: EventHeroAction;
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Bright editorial hero: large type on the left, a leaf-cropped photo in a
 * tinted bezel on the right, and a facts panel that overlaps the photo edge.
 * On mobile the photo sits under the copy and the panel overlaps its bottom.
 */
export function EventHero({
  title,
  description,
  image,
  imageAlt,
  society,
  category,
  date,
  time,
  venue,
  status,
  seatsLeft,
  fee,
  primaryAction,
  secondaryAction,
  breadcrumbs,
}: EventHeroProps) {
  const meta: EventMetaItem[] = [];
  if (date) meta.push({ icon: CalendarDays, label: "Date", value: date });
  if (time) meta.push({ icon: Clock, label: "Time", value: time });
  if (venue) meta.push({ icon: MapPin, label: "Venue", value: venue });
  if (fee) meta.push({ icon: Ticket, label: "Fee", value: fee });

  return (
    <section className="bg-surface-default relative isolate overflow-hidden">
      <Decor variant="grid" className="inset-0" />
      <Decor
        variant="rings-cyan"
        at="100% 0%"
        className="top-0 right-0 h-[36rem] w-[36rem]"
      />
      <div className="container-page relative grid gap-x-8 gap-y-10 pt-6 pb-16 sm:pb-20 lg:grid-cols-12 lg:items-center lg:pt-8 lg:pb-24">
        {breadcrumbs && (
          <div className="lg:col-span-12">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="flex flex-col gap-6 lg:col-span-7 lg:pr-6">
          <div className="rise-in flex flex-wrap items-center gap-x-4 gap-y-2">
            {category && <CategoryTag category={category} />}
            {society && (
              <Text visualStyle="meta" tone="tertiary">
                {society}
              </Text>
            )}
          </div>
          <Heading
            as="h1"
            visualStyle="hero"
            className="rise-in max-w-[14ch]"
            style={{ "--i": 1 } as CSSProperties}
          >
            {title}
          </Heading>
          {description && (
            <Text
              visualStyle="body-lg"
              tone="secondary"
              className="rise-in max-w-xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              {description}
            </Text>
          )}
          {(primaryAction || secondaryAction) && (
            <div
              className="rise-in flex flex-wrap items-center gap-3 pt-2"
              style={{ "--i": 3 } as CSSProperties}
            >
              {primaryAction && (
                <SpecularButton href={primaryAction.href} size="lg" arrow>
                  {primaryAction.label}
                </SpecularButton>
              )}
              {secondaryAction && (
                <SpecularButton
                  href={secondaryAction.href}
                  size="lg"
                  variant="secondary"
                >
                  {secondaryAction.icon}
                  {secondaryAction.label}
                </SpecularButton>
              )}
            </div>
          )}
        </div>

        <div
          className="rise-in relative lg:col-span-5"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div className="shape-leaf bg-surface-brand p-2 sm:p-2.5">
            <Photo
              src={image}
              alt={imageAlt}
              tone={category ? categoryTone[category] : "blue"}
              shape="leaf"
              aspect="4/3"
              priority
              className="lg:aspect-4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          {(meta.length > 0 || status) && (
            <div className="rounded-card bg-surface-elevated shadow-float relative z-10 mx-3 -mt-12 flex flex-col gap-4 p-5 sm:mx-6 lg:absolute lg:right-6 lg:bottom-8 lg:-left-14 lg:m-0 lg:mt-0">
              {status && (
                <RegistrationStatus
                  status={status}
                  seatsLeft={seatsLeft}
                  className="self-start"
                />
              )}
              {meta.length > 0 && (
                <EventMeta compact layout="stack" items={meta} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
