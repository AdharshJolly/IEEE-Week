import type { Metadata } from "next";
import {
  EventListing,
  type EventListingItem,
} from "@/components/events/EventListing";
import { NavBar } from "@/components/navigation/NavBar";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { EventsHero } from "@/components/sections/EventsHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SocietiesSection } from "@/components/sections/SocietiesSection";
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

  const societyItems = activeSocieties.map((society) => ({
    id: society.id,
    name: society.name,
    short: society.short,
    logo: society.logo,
    eventCount: events.filter((event) => event.societyIds.includes(society.id))
      .length,
  }));

  const first = events[0];
  const links = getNavLinks("/events");

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
        <Section spacing="md" aria-labelledby="listing-title">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <SectionHeading
                id="listing-title"
                eyebrow="All events"
                title="In date order."
                description="Open any event for its dedicated page."
              />
            </div>
            <div className="lg:col-span-8">
              <EventListing
                items={items}
                filters={activeSocieties.map((society) => ({
                  id: society.id,
                  label: society.short,
                }))}
              />
            </div>
          </div>
        </Section>
        <SocietiesSection societies={societyItems} />
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
