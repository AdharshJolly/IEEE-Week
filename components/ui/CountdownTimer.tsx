"use client";

import { useEffect, useState } from "react";
import { Counter, type CounterPlace } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

export interface CountdownTimerProps {
  targetDate: string; // ISO string e.g. "2026-11-11T09:00:00Z"
  className?: string;
}

const UNITS = ["days", "hours", "minutes", "seconds"] as const;
/** Two digits minimum ("07"); more only when the value needs them (days). */
const placesFor = (value: number): CounterPlace[] => {
  const length = Math.max(2, String(value).length);
  return Array.from({ length }, (_, i) => 10 ** (length - i - 1));
};

const LABELS = { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" };

/**
 * Flat readout: mono numerals separated by hairline rules. The empty state
 * reserves the same height, so hydration never shifts layout.
 */
export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<Record<
    (typeof UNITS)[number],
    number
  > | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const update = () => {
      const distance = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance % 86_400_000) / 3_600_000),
        minutes: Math.floor((distance % 3_600_000) / 60_000),
        seconds: Math.floor((distance % 60_000) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isLive =
    timeLeft !== null && UNITS.every((unit) => timeLeft[unit] === 0);

  if (isLive) {
    return (
      <p
        className={cn(
          "type-tech text-content-brand flex items-center gap-3",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="bg-interactive-primary size-2 rounded-full"
        />
        Event is live
      </p>
    );
  }

  return (
    <div
      role="timer"
      aria-label="Countdown to kickoff"
      className={cn("grid min-h-14 grid-cols-4 divide-x", className)}
    >
      {UNITS.map((unit) => (
        <div
          key={unit}
          className="border-line flex flex-col gap-1.5 px-4 first:pl-0"
        >
          <span
            className={cn(
              "font-display text-2xl leading-none font-bold sm:text-3xl",
              timeLeft === null && "tabular-nums",
            )}
          >
            {timeLeft ? (
              <Counter
                value={timeLeft[unit]}
                places={placesFor(timeLeft[unit])}
                label={String(timeLeft[unit]).padStart(2, "0")}
                tone={unit === "seconds" ? "brand" : "primary"}
              />
            ) : (
              "--"
            )}
          </span>
          <span className="type-tech text-content-tertiary">
            {LABELS[unit]}
          </span>
        </div>
      ))}
    </div>
  );
}
