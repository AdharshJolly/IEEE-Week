"use client";

import { CalendarDays } from "lucide-react";

export function AddToCalendarButton({ title }: { title: string }) {
  return (
    <button 
      className="flex items-center gap-2 text-content-brand hover:text-interactive-hover font-medium text-sm transition-colors"
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
