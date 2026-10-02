import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/events";
import { getSiteUrl } from "@/lib/site/url";

/** Public, indexable routes. Event pages come from the data-access layer. */
const STATIC_ROUTES = ["/", "/events", "/about", "/contact"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl();
  const events = await getEvents();
  const paths = [
    ...STATIC_ROUTES,
    ...events.map((event) => `/events/${event.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, origin).toString() }));
}
