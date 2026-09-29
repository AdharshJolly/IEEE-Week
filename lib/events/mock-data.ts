import type { EventSummary, Society } from "@/types/event";

/**
 * Static stand-in for the future MongoDB collections. Only facts supplied by
 * the organisers appear here; the schedule is tentative.
 * Consumers must go through `lib/events/index.ts`, never this file.
 */
export const mockSocieties: Society[] = [
  { id: "cis", short: "CIS", name: "Computational Intelligence Society" },
  { id: "vts", short: "VTS", name: "Vehicular Technology Society" },
  {
    id: "aess",
    short: "AESS",
    name: "Aerospace and Electronic Systems Society",
  },
  { id: "ras", short: "RAS", name: "Robotics and Automation Society" },
  { id: "grss", short: "GRSS", name: "Geoscience and Remote Sensing Society" },
  { id: "aps", short: "APS", name: "Antennas and Propagation Society" },
  {
    id: "mtts",
    short: "MTTS",
    name: "Microwave Theory and Technology Society",
  },
  { id: "cs", short: "CS", name: "Computer Society" },
  {
    id: "sb",
    short: "SB",
    name: "IEEE CHRIST University Student Branch Chapter",
  },
];

export const mockEvents: EventSummary[] = [
  {
    slug: "inauguration-ideathon",
    title: "Inauguration + Ideathon + Society Inaugurations",
    startDate: "2026-11-11",
    societyIds: ["cis", "vts", "ras"],
    tentative: true,
  },
  {
    slug: "cis-llm-genai-workshop",
    title: "CIS LLMs or Gen AI Workshop",
    startDate: "2026-11-12",
    societyIds: ["cis"],
    tentative: true,
  },
  {
    slug: "agent-forge",
    title: "IEEE Agent Forge AI Agents Workshop and Hackathon",
    startDate: "2026-11-13",
    endDate: "2026-11-14",
    societyIds: ["cs", "sb"],
    tentative: true,
  },
  {
    slug: "aerospace-geo-sensing-workshop",
    title: "Workshop on Aerospace and Geo-sensing Application",
    startDate: "2026-11-16",
    societyIds: ["grss", "aess"],
    tentative: true,
  },
  {
    slug: "ai-antenna-design-workshop",
    title: "AI Driven Antenna Design Workshop",
    startDate: "2026-11-16",
    endDate: "2026-11-18",
    societyIds: ["aps", "mtts"],
    tentative: true,
  },
];
