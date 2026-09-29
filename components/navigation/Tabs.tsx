"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  /** Optional count shown in a mono chip. */
  count?: number;
  panel: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  variant?: "underline" | "pill";
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
}

/**
 * WAI-ARIA tabs with automatic activation: arrow keys move focus and select,
 * Home/End jump to the ends, and only the active tab is in the tab order.
 */
export function Tabs({
  tabs,
  defaultTab,
  variant = "underline",
  label,
  className,
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (id: string) => {
    setActive(id);
    tabRefs.current[id]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (event.key in next) {
      event.preventDefault();
      select(tabs[next[event.key]].id);
    }
  };

  const pill = variant === "pill";

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "flex gap-1 overflow-x-auto",
          pill
            ? "rounded-card bg-surface-muted inline-flex p-1"
            : "border-line border-b",
        )}
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "type-body duration-fast ease-standard relative inline-flex shrink-0 items-center gap-2 px-4 font-medium whitespace-nowrap transition-colors",
                "text-content-secondary hover:text-content-primary aria-selected:text-content-primary aria-selected:font-semibold",
                pill
                  ? "rounded-control aria-selected:bg-surface-default aria-selected:shadow-rest h-11"
                  : "after:bg-interactive-primary after:duration-base after:ease-standard h-12 after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-center after:scale-x-0 after:rounded-t-full after:transition-transform aria-selected:after:scale-x-100",
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="bg-surface-muted text-content-secondary type-meta rounded-tag px-1.5 py-0.5">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="pt-6"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
