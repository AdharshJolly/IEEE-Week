import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export interface EventDateTimelineItem {
  id: string;
  href: string;
  title: string;
  /** Day part of the date, e.g. "13–14". */
  day: string;
  /** Month part, e.g. "Nov". */
  month: string;
  /** Full accessible date, e.g. "13–14 Nov". */
  dateLabel: string;
  /** Short society codes. */
  societies: string[];
  tentative?: boolean;
}

export interface EventDateTimelineProps {
  items: EventDateTimelineItem[];
  label: string;
}

/**
 * Chronological rail: date on the left, event on the right, joined by a spine.
 * On mobile the rail moves to the left edge and dates sit above titles.
 */
export function EventDateTimeline({ items, label }: EventDateTimelineProps) {
  return (
    <ol aria-label={label} className="m-0 flex list-none flex-col p-0">
      {items.map((item) => (
        <li
          key={item.id}
          className="reveal group/item grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[11rem_2rem_minmax(0,1fr)] md:gap-x-6"
        >
          <div
            aria-hidden="true"
            className="relative col-start-1 row-span-2 row-start-1 flex justify-center md:col-start-2 md:row-span-1"
          >
            <span className="bg-line absolute inset-y-0 w-px group-last/item:bottom-auto group-last/item:h-4" />
            <span className="border-interactive-primary bg-surface-default group-hover/item:bg-interactive-primary duration-base ease-standard relative mt-2.5 size-3.5 rounded-full border-2 transition-colors" />
          </div>

          <div className="col-start-2 row-start-1 flex items-baseline gap-2 pb-2 md:col-start-1 md:justify-end md:pb-0 md:text-right">
            <span className="font-display text-content-primary text-4xl leading-none font-bold tracking-tight whitespace-nowrap tabular-nums">
              {item.day}
            </span>
            <span className="type-eyebrow text-content-brand">
              {item.month}
            </span>
          </div>

          <Link
            href={item.href}
            className="rounded-card hover:bg-surface-subtle duration-base ease-standard col-start-2 row-start-2 mb-8 flex flex-col gap-3 py-3 no-underline transition-colors md:col-start-3 md:row-start-1 md:-mt-2 md:px-4"
          >
            <span className="sr-only">{item.dateLabel}: </span>
            <span className="flex items-start justify-between gap-4">
              <span className="type-h3 text-content-primary text-balance">
                {item.title}
              </span>
              <ArrowUpRight
                className="text-content-brand duration-base ease-emphasis mt-1 size-5 shrink-0 transition-transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-wrap items-center gap-2">
              {item.societies.map((code) => (
                <Badge key={code} variant="brand">
                  {code}
                </Badge>
              ))}
              {item.tentative && <Badge variant="outline">Tentative</Badge>}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
