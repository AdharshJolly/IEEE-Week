import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailBody } from "@/components/events/EventDetailBody";
import { EventDetailHero } from "@/components/events/EventDetailHero";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { getEventBySlug, getEvents, getRelatedEvents } from "@/lib/events";
import { eventStatusLabel, formatDateRange } from "@/lib/events/format";

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

  const related = await getRelatedEvents(event);
  const date = formatDateRange(event.startDate, event.endDate);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <EventDetailHero
        title={event.title}
        dateLabel={date.label}
        day={date.day}
        month={date.month}
        societyNames={event.societies.map((society) => society.name)}
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
          societyNames: item.societies.map((society) => society.name),
        }))}
      />
    </div>
  );
}
