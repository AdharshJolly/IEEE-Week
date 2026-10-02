"use client";

import { useRef, useState } from "react";
import { EventCategory, RegistrationState } from "@/types/event";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { EventRow } from "./EventRow";
import { Flip, gsap, useGSAP } from "@/lib/motion/gsap";
import { duration, ease, layout } from "@/lib/motion/tokens";

export interface EventListingItem {
  id: string;
  href: string;
  title: string;
  day: string;
  month: string;
  dateLabel: string;
  societyIds: string[];
  /** Short codes. */
  societyNames: string[];
  societyFullNames: string[];
  statusLabel: string;
  tentative: boolean;
  category?: EventCategory;
  registrationState?: RegistrationState;
  speakerAvatar?: string;
}

export interface EventListingProps {
  items: EventListingItem[];
}

const CATEGORIES: { label: string; value: EventCategory | "all" }[] = [
  { label: "All Events", value: "all" },
  { label: "Workshops", value: "workshop" },
  { label: "Competitions", value: "competition" },
  { label: "Talks", value: "talk" },
  { label: "Networking", value: "networking" },
  { label: "Social", value: "social" },
];

export function EventListing({ items }: EventListingProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">(
    "all",
  );

  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const isVisible = (item: EventListingItem) =>
    activeCategory === "all" || item.category === activeCategory;
  const filteredItems = items.filter(isVisible);

  // Every card stays mounted; filtering toggles `hidden`. Flip records the
  // layout before the change and animates cards in, out and to their new
  // slots. Reduced motion: the change applies instantly.
  const selectCategory = (value: EventCategory | "all") => {
    const cards = grid.current?.querySelectorAll("[data-event-card]");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    flipState.current = cards && !reduce ? Flip.getState(cards) : null;
    setActiveCategory(value);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      Flip.from(state, {
        duration: layout.duration,
        ease: layout.ease,
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              duration: duration.base,
              ease: ease.emphasis,
            },
          ),
        onLeave: (els) =>
          gsap.to(els, {
            opacity: 0,
            scale: 0.96,
            duration: duration.base,
            ease: ease.standard,
          }),
      });
    },
    { dependencies: [activeCategory], scope: grid },
  );

  const activeCategories = new Set(
    items.map((item) => item.category).filter(Boolean),
  );
  const availableTabs = CATEGORIES.filter(
    (tab) =>
      tab.value === "all" || activeCategories.has(tab.value as EventCategory),
  );

  return (
    <div className="flex flex-col gap-8">
      <div
        role="group"
        aria-label="Filter by category"
        className="border-line -mx-5 flex scrollbar-none gap-6 overflow-x-auto border-b px-5 sm:mx-0 sm:px-0"
      >
        {availableTabs.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectCategory(tab.value)}
              className={cn(
                "type-tech duration-fast ease-standard -mb-px border-b-2 py-3 whitespace-nowrap transition-colors",
                isActive
                  ? "border-interactive-primary text-content-brand"
                  : "text-content-tertiary hover:text-content-primary border-transparent",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        aria-atomic="true"
        className="type-meta text-content-secondary -mb-3"
      >
        Showing <Counter value={filteredItems.length} tone="primary" /> of{" "}
        {items.length} {items.length === 1 ? "event" : "events"}
      </p>

      <ul
        ref={grid}
        className="border-line m-0 flex list-none flex-col border-b p-0"
      >
        {items.map((item, position) => (
          <EventRow
            key={item.id}
            index={position + 1}
            href={item.href}
            title={item.title}
            day={item.day}
            month={item.month}
            dateLabel={item.dateLabel}
            societyShorts={item.societyNames}
            societyNames={item.societyFullNames}
            category={item.category}
            registrationState={item.registrationState}
            tentative={item.tentative}
            hidden={!isVisible(item)}
          />
        ))}
      </ul>

      {filteredItems.length === 0 && (
        <p className="type-body text-content-secondary py-12">
          No events in this category yet.
        </p>
      )}
    </div>
  );
}
