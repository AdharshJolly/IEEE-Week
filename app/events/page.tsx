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
      societyNames: event.societies.map((society) => society.short),
      statusLabel: eventStatusLabel(event.tentative),
      tentative: event.tentative,
      category: event.category,
      registrationState: event.registrationState,
    };
  });

  // Find the event with the highest registrationsCount
  const featured = [...events].sort((a, b) => (b.registrationsCount || 0) - (a.registrationsCount || 0))[0];
  const featuredDate = featured ? formatDateRange(featured.startDate, featured.endDate) : null;
  const links = getNavLinks("/events");

  // Filter out the featured event from the listing if we display it as featured
  const remainingItems = items.filter((item) => item.id !== featured?.slug);

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
        
        {featured && featuredDate && (
          <Section spacing="md">
            <SectionHeading
              id="featured-event-title"
              eyebrow="Trending Now"
              title="Featured Event"
              description="Our most popular event with the highest registrations."
              className="mb-8"
            />
            <FeaturedEventCard
              title={featured.title}
              date={featuredDate.label}
              society={featured.societies.map((s) => s.short).join(" & ")}
              href={`/events/${featured.slug}`}
              layout="split"
            />
          </Section>
        )}

        <Section spacing="md" aria-labelledby="listing-title">
          <SectionHeading
            id="listing-title"
            eyebrow="All events"
            title="Choose your track."
            description="Explore our massive schedule of events below."
            className="mb-10 text-center mx-auto"
          />
          <EventListing items={remainingItems} />
        </Section>
        <FinalCta
          year={content.year}
          note={note}
          primary={
            featured
              ? { label: "See featured event", href: `/events/${featured.slug}` }
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
