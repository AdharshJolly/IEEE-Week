"use client";

import { CalendarDays } from "lucide-react";

export function AddToCalendarButton({ title }: { title: string }) {
  return (
    <button
      className="text-content-brand hover:text-interactive-hover flex items-center gap-2 text-sm font-medium transition-colors"
      onClick={() => {
        // Placeholder for real iCal generation
        alert("This would download an .ics file for " + title);
      }}
    >
      <CalendarDays className="size-4" />
      <span>Add to Calendar</span>
    </button>
  );
}
