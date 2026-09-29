import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailBody } from "@/components/events/EventDetailBody";
import { EventDetailHero } from "@/components/events/EventDetailHero";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { NavBar } from "@/components/navigation/NavBar";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { getEventBySlug, getEvents, getRelatedEvents } from "@/lib/events";
import { eventStatusLabel, formatDateRange } from "@/lib/events/format";
import { getHomepageContent } from "@/lib/site/homepage";
import { getNavLinks } from "@/lib/site/navigation";

export async function generateStaticParams() {
  return (await getEvents()).map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  if (!event) return {};
  return {
    title: `${event.title} | IEEE Week`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const [content, related] = await Promise.all([
    getHomepageContent(),
    getRelatedEvents(event),
  ]);
  const links = getNavLinks("/events");
  const date = formatDateRange(event.startDate, event.endDate);

  return (
    <>
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "Explore Events", href: "/events" }}
      />
      <main id="main-content" className="flex-1">
        <EventDetailHero
          title={event.title}
          dateLabel={date.label}
          day={date.day}
          month={date.month}
          societyNames={event.societies.map((society) => society.short)}
          statusLabel={eventStatusLabel(event.tentative)}
          tentative={event.tentative}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: event.title },
          ]}
        />
        <EventDetailBody
          description={event.description}
          details={event.details}
          schedule={event.schedule}
          speakers={event.speakers}
          registrationUrl={event.registrationUrl}
          eventTitle={event.title}
        />
        <RelatedEvents
          items={related.map((item) => ({
            id: item.slug,
            href: `/events/${item.slug}`,
            title: item.title,
            dateLabel: formatDateRange(item.startDate, item.endDate).label,
            societyNames: item.societies.map((society) => society.short),
          }))}
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
