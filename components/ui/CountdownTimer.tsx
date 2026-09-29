"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountdownTimerProps {
  targetDate: string; // ISO string e.g. "2026-11-11T09:00:00Z"
  className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const update = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className={cn("h-16 rounded-card bg-surface-muted animate-pulse", className)} />;
  }

  const isLive = 
    timeLeft.days === 0 && timeLeft.hours === 0 && 
    timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isLive) {
    return (
      <div className={cn("inline-flex items-center gap-2 rounded-full bg-interactive-primary px-4 py-2 text-content-on-brand shadow-glow", className)}>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="font-semibold tracking-wide uppercase text-sm">Event is Live</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4 rounded-card bg-surface-elevated p-4 shadow-float border border-line", className)}>
      <div className="flex items-center justify-center size-10 rounded-full bg-surface-brand text-content-brand shrink-0">
        <Clock className="size-5" />
      </div>
      <div className="flex gap-4 sm:gap-6 type-meta tabular-nums">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-content-primary leading-none">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[0.65rem] uppercase tracking-wider text-content-secondary mt-1">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-content-primary leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[0.65rem] uppercase tracking-wider text-content-secondary mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-content-primary leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[0.65rem] uppercase tracking-wider text-content-secondary mt-1">Mins</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-content-brand leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[0.65rem] uppercase tracking-wider text-content-brand mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}
