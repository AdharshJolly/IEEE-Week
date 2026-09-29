"use client";

import { useMemo, useState } from "react";
import { FilterChips } from "@/components/navigation/FilterChips";
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

export interface EventListingFilter {
  id: string;
  label: string;
}

export interface EventListingProps {
  items: EventListingItem[];
  filters: EventListingFilter[];
}

/**
 * Grid of EventCards with society filtering.
 */
export function EventListing({ items, filters }: EventListingProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const options = useMemo(
    () =>
      filters.map((filter) => ({
        value: filter.id,
        label: filter.label,
        count: items.filter((item) => item.societyIds.includes(filter.id))
          .length,
      })),
    [filters, items],
  );

  const visible =
    selected.length === 0
      ? items
      : items.filter((item) =>
          item.societyIds.some((id) => selected.includes(id)),
        );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Text visualStyle="label" tone="secondary">
          Filter by society
        </Text>
        <FilterChips
          label="Filter events by society"
          options={options}
          multiple
          onChange={setSelected}
        />
      </div>

      <p
        className="type-meta text-content-tertiary -mb-6"
        role="status"
        aria-live="polite"
      >
        Showing {visible.length} of {items.length}{" "}
        {items.length === 1 ? "event" : "events"}
      </p>

      {visible.length === 0 ? (
        <Text tone="secondary">No events match this selection.</Text>
      ) : (
        <div
          aria-label="IEEE Week events by date"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
        >
          {visible.map((item) => (
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
