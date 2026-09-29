"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterChips } from "@/components/navigation/FilterChips";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";

export interface EventListingItem {
  id: string;
  href: string;
  title: string;
  /** Day part, e.g. "13–14". */
  day: string;
  /** Month part, e.g. "Nov". */
  month: string;
  /** Full accessible date, e.g. "13–14 Nov". */
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
 * Chronological editorial list with society filtering. Rows are separated by
 * hairlines instead of cards: date leads, title dominates, meta trails.
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
        <ol
          aria-label="IEEE Week events by date"
          className="border-line m-0 flex list-none flex-col border-t p-0"
        >
          {visible.map((item) => (
            <li key={item.id} className="border-line m-0 border-b">
              <Link
                href={item.href}
                className="group hover:bg-surface-subtle duration-base ease-standard grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 py-7 no-underline transition-colors md:grid-cols-[9rem_minmax(0,1fr)_auto] md:gap-x-8 md:px-4"
              >
                <div className="col-span-2 flex items-baseline gap-2 md:col-span-1">
                  <span className="font-display text-content-primary text-4xl leading-none font-bold tracking-tight whitespace-nowrap tabular-nums">
                    {item.day}
                  </span>
                  <span className="type-eyebrow text-content-brand">
                    {item.month}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col gap-3">
                  <span className="sr-only">{item.dateLabel}: </span>
                  <span className="type-h3 text-content-primary text-balance">
                    {item.title}
                  </span>
                  <span className="type-body-sm text-content-secondary">
                    {item.societyNames.join(" · ")}
                  </span>
                  <span>
                    <Badge variant={item.tentative ? "outline" : "success"}>
                      {item.statusLabel}
                    </Badge>
                  </span>
                </div>

                <ArrowUpRight
                  className="text-content-brand duration-base ease-emphasis mt-1.5 size-6 shrink-0 self-start transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
