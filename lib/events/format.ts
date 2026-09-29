import type { IsoDate } from "@/types/event";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parts(date: IsoDate) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month: MONTHS[month - 1], day };
}

/** "13–14" or "11" plus the month; ranges across months keep both. */
export function formatDateRange(start: IsoDate, end?: IsoDate) {
  const s = parts(start);
  if (!end || end === start) {
    return { day: String(s.day), month: s.month, label: `${s.day} ${s.month}` };
  }
  const e = parts(end);
  if (e.month === s.month) {
    return {
      day: `${s.day}–${e.day}`,
      month: s.month,
      label: `${s.day}–${e.day} ${s.month}`,
    };
  }
  return {
    day: `${s.day}–${e.day}`,
    month: `${s.month}–${e.month}`,
    label: `${s.day} ${s.month} – ${e.day} ${e.month}`,
  };
}

/** Every ISO date from `start` to `end` inclusive (UTC, DST-safe). */
export function eachDay(start: IsoDate, end: IsoDate): IsoDate[] {
  const days: IsoDate[] = [];
  const cursor = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cursor <= last) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

export function dayOfMonth(date: IsoDate): number {
  return parts(date).day;
}

/** Human label for the schedule status of an event. */
export function eventStatusLabel(tentative: boolean): string {
  return tentative ? "Tentative" : "Confirmed";
}

/** Date span and counts across a set of events, derived from the data. */
export function summarizeEvents(
  events: { startDate: IsoDate; endDate?: IsoDate; tentative: boolean }[],
) {
  const first = events.map((e) => e.startDate).sort()[0];
  const last = events
    .map((e) => e.endDate ?? e.startDate)
    .sort()
    .at(-1);
  return {
    range: first && last ? formatDateRange(first, last) : undefined,
    dayCount: first && last ? eachDay(first, last).length : 0,
    anyTentative: events.some((e) => e.tentative),
  };
}
