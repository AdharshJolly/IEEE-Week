import { ScheduleCard, type ScheduleCardProps } from "./ScheduleCard";

export interface EventTimelineDay {
  /** Day marker, e.g. "Day 1". */
  label: string;
  /** Human-readable date, e.g. "Mon, 13 Oct". */
  date?: string;
  items: (ScheduleCardProps & { id?: string })[];
}

export interface EventTimelineProps {
  days: EventTimelineDay[];
}

/** Day label pins beside its sessions on desktop; stacks above on mobile. */
export function EventTimeline({ days }: EventTimelineProps) {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {days.map((day) => (
        <section
          key={day.label}
          aria-label={day.date ? `${day.label}, ${day.date}` : day.label}
          className="grid gap-5 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10"
        >
          <div className="flex items-baseline gap-4 self-start lg:sticky lg:top-28 lg:block">
            <p className="type-h2">{day.label}</p>
            {day.date && (
              <p className="type-meta text-content-tertiary lg:mt-2">
                {day.date}
              </p>
            )}
          </div>
          <ol className="before:bg-line relative m-0 flex list-none flex-col gap-3 p-0 pl-8 before:absolute before:top-3 before:bottom-3 before:left-[0.4375rem] before:w-px">
            {day.items.map((item) => {
              const current = item.active ?? item.live;
              return (
                <li
                  key={item.id ?? `${item.time}-${item.title}`}
                  className={
                    "reveal relative before:absolute before:top-7 before:-left-8 before:size-3.5 before:rounded-full before:border-2 " +
                    (current
                      ? "before:border-interactive-primary before:bg-interactive-primary before:ring-interactive-primary/20 before:ring-4"
                      : "before:border-line-control before:bg-surface-default")
                  }
                >
                  <ScheduleCard {...item} active={current} />
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
