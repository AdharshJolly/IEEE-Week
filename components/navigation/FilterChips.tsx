"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FilterChipOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterChipsProps {
  options: FilterChipOption[];
  /** Accessible name for the group. */
  label: string;
  /** Allow several chips to be pressed at once. */
  multiple?: boolean;
  defaultValue?: string[];
  /** Called with the full selection after each change. */
  onChange?: (value: string[]) => void;
  className?: string;
}

/**
 * Toggle buttons (`aria-pressed`) for client-side filtering. Chips use the
 * control radius rather than a pill so filters read as tools, not tags.
 */
export function FilterChips({
  options,
  label,
  multiple = false,
  defaultValue = [],
  onChange,
  className,
}: FilterChipsProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  const toggle = (value: string) => {
    let next: string[];
    if (multiple) {
      next = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
    } else {
      next = selected.includes(value) ? [] : [value];
    }
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const pressed = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => toggle(option.value)}
            className={cn(
              "type-body-sm rounded-control duration-base ease-emphasis inline-flex h-11 items-center gap-2 border px-4 font-medium transition-[background-color,border-color,color,transform] active:scale-[0.98]",
              pressed
                ? "border-interactive-primary bg-interactive-primary text-content-on-brand"
                : "border-line bg-surface-default text-content-secondary hover:border-line-control hover:bg-surface-subtle hover:text-content-primary",
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  "type-meta",
                  pressed
                    ? "text-content-on-brand/80"
                    : "text-content-tertiary",
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
