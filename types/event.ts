export type EventCategory =
  "workshop" | "competition" | "talk" | "networking" | "social";

export type RegistrationState =
  "open" | "limited" | "closed" | "soon" | "registered";

/** ISO calendar date, `YYYY-MM-DD`. */
export type IsoDate = string;

/** A society or group taking part in IEEE Week. */
export interface Society {
  /** Stable identifier, e.g. "cis". */
  id: string;
  /** Short code shown in marks and chips, e.g. "CIS". */
  short: string;
  /** Full official name, used for display. */
  name: string;
  /** A short one-liner description of the society. */
  description?: string;
  /** Official logo URL. Omit until officially provided. */
  logo?: string;
}

/** A labelled fact about an event (venue, fee, ...). Only officially supplied ones exist. */
export interface EventDetail {
  label: string;
  value: string;
}

/** One session in an event's schedule. Times are free text as supplied, e.g. "10:00". */
export interface EventScheduleItem {
  time: string;
  endTime?: string;
  title: string;
}

/** An event as listed on the homepage timeline. Detail lives on `/events/[slug]`. */
export interface EventSummary {
  slug: string;
  title: string;
  /** First day of the event. */
  startDate: IsoDate;
  /** Last day; omit for single-day events. */
  endDate?: IsoDate;
  /** Ids of organising societies, in display order. */
  societyIds: string[];
  /** Whether the schedule details are still subject to change. */
  tentative: boolean;
  /** Type of event. */
  category?: EventCategory;
  /** Registration availability status. */
  registrationState?: RegistrationState;
  /** The current number of registrations for this event. */
  registrationsCount?: number;
  /** Omit until official copy is provided; the page then skips the section. */
  description?: string;
  /** Optional facts such as venue or fee; omit until provided. */
  details?: EventDetail[];
  /** Optional speakers list; omit until provided. */
  speakers?: { name: string; role: string; avatarUrl: string }[];
  /** Optional session list; omit until provided. */
  schedule?: EventScheduleItem[];
  /** External registration link; omit until registration is announced. */
  registrationUrl?: string;
}

/** An event with its societies resolved, ready for presentation. */
export interface EventWithSocieties extends EventSummary {
  societies: Society[];
}

export interface HomepageContent {
  /** Official presenting organisation. */
  organization: string;
  /** Edition year, e.g. "2026". */
  year: string;
  /** Short supporting line under the hero title. */
  heroSummary: string;
  /** Statement for the About section. */
  aboutStatement: string;
  /** Optional extra About copy; omitted until provided. */
  aboutDetail?: string;
  /** Shown when dates are not final. */
  tentativeNote?: string;
}
