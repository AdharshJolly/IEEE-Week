import { EventTimeline } from "@/components/events/EventTimeline";
import { ScheduleCard } from "@/components/events/ScheduleCard";
import { Tabs } from "@/components/navigation/Tabs";
import { Section } from "@/components/ui/Section";
import { timelineDays } from "../fixtures";
import { SectionIntro } from "./SectionIntro";

export function ScheduleSection() {
  const flat = timelineDays.flatMap((day) =>
    day.items.map((item) => ({ ...item, day: day.label })),
  );
  return (
    <Section id="schedule" tone="subtle" spacing="md">
      <SectionIntro title="Read the day at a glance.">
        Time leads, then the session. The current session gets a tint and a soft
        live marker instead of a louder colour.
      </SectionIntro>
      <div className="mt-12">
        <Tabs
          label="Schedule view"
          variant="pill"
          tabs={[
            {
              id: "timeline",
              label: "Timeline",
              panel: <EventTimeline days={timelineDays} />,
            },
            {
              id: "list",
              label: "All sessions",
              count: flat.length,
              panel: (
                <ul className="m-0 flex max-w-3xl list-none flex-col gap-3 p-0">
                  {flat.map((item) => (
                    <li key={`${item.day}-${item.time}`}>
                      <ScheduleCard {...item} href="#schedule" />
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </div>
    </Section>
  );
}
