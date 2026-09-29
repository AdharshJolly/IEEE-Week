import type { Metadata } from "next";
import {
  EventListing,
  type EventListingItem,
} from "@/components/events/EventListing";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { NavBar } from "@/components/navigation/NavBar";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { EventsHero } from "@/components/sections/EventsHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/Section";
import { getEvents, getSocieties } from "@/lib/events";
import {
  eventStatusLabel,
  formatDateRange,
  summarizeEvents,
} from "@/lib/events/format";
import { getHomepageContent } from "@/lib/site/homepage";
import { getNavLinks } from "@/lib/site/navigation";

export const metadata: Metadata = {
  title: "Events | IEEE Week",
  description:
    "Every IEEE Week event in date order, with the societies organising each one.",
};

export default async function EventsPage() {
  const [content, events, societies] = await Promise.all([
    getHomepageContent(),
    getEvents(),
    getSocieties(),
  ]);

  const { range, dayCount, anyTentative } = summarizeEvents(events);
  const usedIds = new Set(events.flatMap((event) => event.societyIds));
  const activeSocieties = societies.filter((society) =>
    usedIds.has(society.id),
  );
  const note = anyTentative ? content.tentativeNote : undefined;

  const items: EventListingItem[] = events.map((event) => {
    const date = formatDateRange(event.startDate, event.endDate);
    return {
      id: event.slug,
      href: `/events/${event.slug}`,
      title: event.title,
      day: date.day,
      month: date.month,
      dateLabel: date.label,
      societyIds: event.societyIds,
      societyNames: event.societies.map((society) => society.name),
      statusLabel: eventStatusLabel(event.tentative),
      tentative: event.tentative,
    };
  });

  const first = events[0];
  const firstDate = first ? formatDateRange(first.startDate, first.endDate) : null;
  const links = getNavLinks("/events");

  // Filter out the first event from the listing if we display it as featured
  const remainingItems = items.slice(1);

  return (
    <>
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "Explore Events", href: "/events" }}
      />
      <main id="main-content" className="flex-1">
        <EventsHero
          organization={content.organization}
          year={content.year}
          dateRange={range?.label}
          note={note}
          stats={[
            { value: String(events.length), label: "Events" },
            { value: String(activeSocieties.length), label: "Societies" },
            { value: String(dayCount), label: "Days" },
          ]}
        />
        
        {first && firstDate && (
          <Section spacing="md">
            <SectionHeading
              id="featured-event-title"
              eyebrow="Up Next"
              title="Featured Event"
              description="Don't miss our opening event."
              className="mb-8"
            />
            <FeaturedEventCard
              title={first.title}
              date={firstDate.label}
              society={first.societies.map((s) => s.name).join(" & ")}
              href={`/events/${first.slug}`}
              layout="split"
            />
          </Section>
        )}

        <Section spacing="md" aria-labelledby="listing-title">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <SectionHeading
                id="listing-title"
                eyebrow="All events"
                title="In date order."
                description="Explore the rest of the events in our schedule."
              />
            </div>
            <div className="lg:col-span-8">
              <EventListing
                items={remainingItems}
                filters={activeSocieties.map((society) => ({
                  id: society.id,
                  label: society.short,
                }))}
              />
            </div>
          </div>
        </Section>
        <FinalCta
          year={content.year}
          note={note}
          primary={
            first
              ? { label: "See the first event", href: `/events/${first.slug}` }
              : { label: "Back to home", href: "/" }
          }
          secondary={{ label: "Back to home", href: "/" }}
        />
      </main>
      <SiteFooter
        organization={content.organization}
        year={content.year}
        links={links}
      />
    </>
  );
}
