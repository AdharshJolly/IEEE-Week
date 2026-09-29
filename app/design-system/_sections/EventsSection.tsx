import { EventCard } from "@/components/events/EventCard";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { FilterChips } from "@/components/navigation/FilterChips";
import { Decor } from "@/components/ui/Decor";
import { Section } from "@/components/ui/Section";
import { events, featuredEvent, filterOptions, standIn } from "../fixtures";
import { SectionIntro } from "./SectionIntro";

export function EventsSection() {
  return (
    <Section
      id="events"
      tone="default"
      spacing="md"
      decor={
        <Decor
          variant="dots"
          className="top-24 right-0 h-80 w-[36rem] max-w-full"
        />
      }
    >
      <SectionIntro eyebrow="Events" title="A week you can plan around.">
        Cards lead with the photo, then the facts people decide on: when, where
        and whether there is room.
      </SectionIntro>

      <div className="mt-12 flex flex-col gap-10">
        <FilterChips
          label="Filter events by format"
          options={filterOptions}
          defaultValue={["all"]}
        />

        <FeaturedEventCard
          {...featuredEvent}
          image={standIn.hall}
          imageAlt="Students filling a lecture hall (stand-in photography)"
          href="#events"
          ctaLabel="Reserve a seat"
        />

        <ul className="m-0 grid list-none gap-x-6 gap-y-10 p-0 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <li key={event.title} className="reveal flex">
              <EventCard
                {...event}
                href="#events"
                image={index === 2 ? standIn.lab : undefined}
                imageAlt={
                  index === 2
                    ? "Engineers at a bench (stand-in photography)"
                    : undefined
                }
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
