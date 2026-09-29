import { NavBar } from "@/components/navigation/NavBar";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventTimelineSection } from "@/components/sections/EventTimelineSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { HomeHero } from "@/components/sections/HomeHero";
import { WeekAtAGlance } from "@/components/sections/WeekAtAGlance";
import { getEvents, getSocieties } from "@/lib/events";
import { dayOfMonth, eachDay, formatDateRange } from "@/lib/events/format";
import { getHomepageContent } from "@/lib/site/homepage";
import { getNavLinks } from "@/lib/site/navigation";

export default async function Home() {
  const links = getNavLinks();
  const [content, events, societies] = await Promise.all([
    getHomepageContent(),
    getEvents(),
    getSocieties(),
  ]);

  const first = events[0]?.startDate;
  const last = events
    .map((event) => event.endDate ?? event.startDate)
    .sort()
    .at(-1);
  const range = first && last ? formatDateRange(first, last) : undefined;
  const anyTentative = events.some((event) => event.tentative);

  const days = first && last ? eachDay(first, last) : [];
  const glanceDays = days.map((iso) => {
    const eventCount = events.filter(
      (event) =>
        event.startDate <= iso && (event.endDate ?? event.startDate) >= iso,
    ).length;
    const { label } = formatDateRange(iso);
    return {
      id: iso,
      day: dayOfMonth(iso),
      eventCount,
      label: `${label}: ${eventCount} ${eventCount === 1 ? "event" : "events"}`,
    };
  });

  const usedSocietyIds = new Set(events.flatMap((event) => event.societyIds));
  const activeSocieties = societies.filter((society) =>
    usedSocietyIds.has(society.id),
  );

  const timelineItems = events.slice(0, 3).map((event) => {
    const date = formatDateRange(event.startDate, event.endDate);
    return {
      id: event.slug,
      href: `/events/${event.slug}`,
      title: event.title,
      day: date.day,
      month: date.month,
      dateLabel: date.label,
      societies: event.societies.map((society) => society.short),
      tentative: event.tentative,
    };
  });

  const note = anyTentative ? content.tentativeNote : undefined;

  return (
    <>
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "Explore Events", href: "/events" }}
      />
      <main id="main-content" className="flex-1">
        <HomeHero
          organization={content.organization}
          year={content.year}
          summary={content.heroSummary}
          dateRange={range?.label}
          firstEventDate={first ? `${first}T09:00:00Z` : undefined}
          eventCount={events.length}
          tentative={anyTentative}
        />
        <WeekAtAGlance
          stats={[
            { value: String(events.length), label: "Events" },
            { value: String(activeSocieties.length), label: "Societies" },
            { value: String(days.length), label: "Days" },
          ]}
          days={glanceDays}
          month={range?.month ?? ""}
          note={note}
        />
        <EventTimelineSection items={timelineItems} />
        <AboutSection
          statement={content.aboutStatement}
          detail={content.aboutDetail}
          organization={content.organization}
        />
        <FinalCta year={content.year} note={note} />
      </main>
      <SiteFooter
        organization={content.organization}
        year={content.year}
        links={links}
      />
    </>
  );
}
