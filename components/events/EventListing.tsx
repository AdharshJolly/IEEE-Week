"use client";

import { Text } from "@/components/ui/Text";
import { EventCard } from "./EventCard";

export interface EventListingItem {
  id: string;
  href: string;
  title: string;
  /** Day part, e.g. "13-14". */
  day: string;
  /** Month part, e.g. "Nov". */
  month: string;
  /** Full accessible date, e.g. "13-14 Nov". */
  dateLabel: string;
  /** Organising society ids, for filtering. */
  societyIds: string[];
  /** Organising society full names, for display. */
  societyNames: string[];
  statusLabel: string;
  tentative: boolean;
}

export interface EventListingProps {
  items: EventListingItem[];
}

/**
 * Grid of EventCards.
 */
export function EventListing({ items }: EventListingProps) {
  return (
    <div className="flex flex-col gap-10">
      <p
        className="type-meta text-content-tertiary -mb-6"
        role="status"
        aria-live="polite"
      >
        Showing {items.length} {items.length === 1 ? "event" : "events"}
      </p>

      {items.length === 0 ? (
        <Text tone="secondary">No events to display.</Text>
      ) : (
        <div
          aria-label="IEEE Week events by date"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
        >
          {items.map((item) => (
            <EventCard
              key={item.id}
              href={item.href}
              title={item.title}
              day={item.day}
              month={item.month}
              society={item.societyNames.join(" & ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
