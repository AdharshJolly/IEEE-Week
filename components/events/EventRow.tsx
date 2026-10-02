"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PixelReveal } from "@/components/motion/PixelReveal";
import { pixel } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import type { EventCategory, RegistrationState } from "@/types/event";
import { CategoryTag } from "./CategoryTag";
import { RegistrationStatus } from "./RegistrationStatus";

export interface EventRowProps {
  /** 1-based position in the listing, shown as "01". */
  index: number;
  href: string;
  title: string;
  day: string;
  month: string;
  dateLabel: string;
  /** Short society codes, in display order. */
  societyShorts: string[];
  /** Full society names, same order. */
  societyNames: string[];
  category?: EventCategory;
  registrationState?: RegistrationState;
  tentative: boolean;
  className?: string;
  hidden?: boolean;
}

/**
 * One editorial row: index, date, title, organisers, action. Structure comes
 * from rules and type, not a container. The organiser cell is the row's one
 * PixelReveal: codes become full names on mouse hover or keyboard focus. It
 * is enhancement only: small screens and touch show the full names plainly,
 * and the full list is always on the event page.
 */
export function EventRow({
  index,
  href,
  title,
  day,
  month,
  dateLabel,
  societyShorts,
  societyNames,
  category,
  registrationState,
  tentative,
  className,
  hidden,
}: EventRowProps) {
  const [active, setActive] = useState(false);

  return (
    <li
      data-event-card=""
      hidden={hidden}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn("border-line m-0 list-none border-t", className)}
    >
      <Link
        href={href}
        className="group hover:bg-surface-subtle duration-base ease-standard grid gap-x-8 gap-y-4 py-7 no-underline transition-colors md:grid-cols-[3rem_8rem_minmax(0,1fr)_12rem_2rem] md:items-start lg:grid-cols-[4rem_10rem_minmax(0,1fr)_14rem_2.5rem] lg:py-9"
      >
        <span
          aria-hidden="true"
          className="type-index text-content-brand md:pt-3"
        >
          {String(index).padStart(2, "0")}
        </span>

        <span className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="type-numeral text-content-primary">{day}</span>
          <span className="type-tech text-content-tertiary">{month}</span>
          <span className="sr-only">{dateLabel}</span>
        </span>

        <span className="flex min-w-0 flex-col gap-4">
          <span className="type-row-title text-content-primary group-hover:text-content-brand duration-base ease-standard transition-colors">
            {title}
          </span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {category && <CategoryTag category={category} size="sm" />}
            {registrationState && (
              <RegistrationStatus status={registrationState} plain />
            )}
            {tentative && (
              <span className="type-tech text-content-tertiary">Tentative</span>
            )}
          </span>
        </span>

        <span className="type-caption text-content-secondary md:hidden">
          {societyNames.join(" · ")}
        </span>
        <span className="hidden md:block md:pt-1">
          <PixelReveal
            active={active}
            pattern={pixel.pattern.row}
            firstContent={
              <span className="type-meta text-content-secondary block">
                {societyShorts.join(" · ")}
              </span>
            }
            secondContent={
              <span className="type-caption text-content-primary block">
                {societyNames.join(" · ")}
              </span>
            }
          />
        </span>

        <ArrowUpRight
          className="text-content-brand duration-base ease-emphasis hidden size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
