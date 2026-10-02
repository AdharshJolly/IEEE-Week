"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PixelReveal } from "@/components/motion/PixelReveal";
import { pixel } from "@/lib/motion/tokens";

export interface HeroRevealProps {
  /** Date span of the series, e.g. "11 Nov – 18 Nov". */
  dateRange: string;
  stats: { value: string; label: string }[];
  opening: {
    title: string;
    href: string;
    dateLabel: string;
    societies: string[];
  };
}

/**
 * The homepage's one signature PixelReveal. The schedule overview (state one)
 * transforms into the first event it leads to (state two): discovery, not
 * decoration. Both states are real data. Mouse hover and a real button drive
 * it, so touch and keyboard never depend on hover, and the button is the
 * accessible name of the interaction.
 */
export function HeroReveal({ dateRange, stats, opening }: HeroRevealProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div
        aria-live="polite"
        onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
      >
        <PixelReveal
          active={active}
          pattern={pixel.pattern.hero}
          className="min-h-72"
          firstContent={
            <div
              data-surface="deep"
              className="bg-surface-deep text-content-on-deep flex h-full flex-col justify-between gap-8 p-6 sm:p-8"
            >
              <p className="type-tech text-content-on-deep-accent">
                Series schedule
              </p>
              <p className="type-h1 text-balance">{dateRange}</p>
              <dl className="border-line-on-deep m-0 grid grid-cols-3 gap-4 border-t pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dd className="type-h3 m-0">{stat.value}</dd>
                    <dt className="type-tech text-content-on-deep-secondary">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          }
          secondContent={
            <div
              data-surface="deep"
              className="bg-interactive-primary text-content-on-deep flex h-full flex-col justify-between gap-8 p-6 sm:p-8"
            >
              <p className="type-tech text-content-on-deep">Opening event</p>
              <div className="flex flex-col gap-3">
                <p className="type-h2 text-balance [overflow-wrap:anywhere]">
                  {opening.title}
                </p>
                <p className="type-meta">
                  {opening.dateLabel}
                  {opening.societies.length > 0 &&
                    ` · ${opening.societies.join(" · ")}`}
                </p>
              </div>
              <Link
                href={opening.href}
                className="type-label border-line-on-deep group flex items-center justify-between gap-4 border-t pt-4 no-underline"
              >
                View event
                <ArrowUpRight
                  className="duration-base ease-emphasis size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
          }
        />
      </div>
      <button
        type="button"
        aria-pressed={active}
        onClick={() => setActive((value) => !value)}
        className="type-tech text-content-brand hover:text-content-primary duration-fast ease-standard rounded-tag flex items-center gap-3 self-start transition-colors"
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {active ? "Back to schedule" : "Reveal opening event"}
      </button>
    </div>
  );
}
