import { NavBar } from "@/components/navigation/NavBar";
import { getHomepageContent } from "@/lib/site/homepage";
import { getNavLinks } from "@/lib/site/navigation";
import { EventsSidebar } from "@/components/events/EventsSidebar";
import { getEvents } from "@/lib/events";
import { formatDateRange } from "@/lib/events/format";

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, events] = await Promise.all([
    getHomepageContent(),
    getEvents(),
  ]);
  const links = getNavLinks("/events");

  const sidebarItems = events.map((event) => {
    const date = formatDateRange(event.startDate, event.endDate);
    return {
      id: event.slug,
      href: `/events/${event.slug}`,
      title: event.title,
      day: date.day,
      month: date.month,
      societyNames: event.societies.map((s) => s.short),
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "About IEEE", href: "/about" }}
        sticky={false}
      />
      
      {/* 
        On desktop, the main container takes the remaining height (calc(100vh - 64px))
        and uses flex to split the screen. 
        On mobile, it just stacks normally.
      */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[calc(var(--page-max)+2*var(--gutter))] w-full mx-auto px-3 sm:px-5 lg:h-[calc(100vh-5rem)]">
        
        {/* Left Sidebar (Master) */}
        <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 lg:h-full lg:overflow-y-auto lg:pr-6 py-6 border-line lg:border-r">
          <h1 className="type-h3 mb-6">Upcoming Events</h1>
          <EventsSidebar items={sidebarItems} />
        </aside>

        {/* Right Content (Detail) */}
        <main id="main-content" className="flex-1 lg:h-full lg:overflow-y-auto lg:pl-6 py-6 relative">
          {children}
        </main>

      </div>
    </div>
  );
}
