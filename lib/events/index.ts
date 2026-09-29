import type { EventWithSocieties, Society } from "@/types/event";
import { mockEvents, mockSocieties } from "./mock-data";

/**
 * Data-access layer. UI imports only from here. When MongoDB lands, replace
 * the bodies below (keep the signatures) and no component changes.
 */

export async function getSocieties(): Promise<Society[]> {
  return mockSocieties;
}

/** Events in chronological order, with societies resolved. */
export async function getEvents(): Promise<EventWithSocieties[]> {
  const societies = await getSocieties();
  const byId = new Map(societies.map((society) => [society.id, society]));
  return [...mockEvents]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((event) => ({
      ...event,
      societies: event.societyIds.flatMap((id) => byId.get(id) ?? []),
    }));
}

export async function getEventBySlug(
  slug: string,
): Promise<EventWithSocieties | undefined> {
  return (await getEvents()).find((event) => event.slug === slug);
}

/**
 * Events related to `event`: those sharing a society first, then the rest in
 * date order, excluding `event` itself.
 */
export async function getRelatedEvents(
  event: EventWithSocieties,
  limit = 3,
): Promise<EventWithSocieties[]> {
  const others = (await getEvents()).filter((e) => e.slug !== event.slug);
  const shares = (e: EventWithSocieties) =>
    e.societyIds.some((id) => event.societyIds.includes(id));
  return [...others.filter(shares), ...others.filter((e) => !shares(e))].slice(
    0,
    limit,
  );
}
