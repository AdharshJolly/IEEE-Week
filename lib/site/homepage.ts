import type { HomepageContent } from "@/types/event";

/**
 * Homepage copy, kept out of JSX. Swap for a CMS/DB read later. Leave
 * optional fields undefined until official copy exists; sections omit them.
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  return {
    organization: "IEEE CHRIST University Student Branch Chapter",
    year: "2026",
    heroSummary:
      "A small, curated series of events co-organised by multiple IEEE societies at CHRIST University.",
    aboutStatement:
      "IEEE Week is a small curated series of events co-organised by multiple IEEE societies at CHRIST University.",
    aboutDetail: undefined,
    tentativeNote:
      "Dates and details are tentative and may change. Final information will be published on each event page.",
  };
}
