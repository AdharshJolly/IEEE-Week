// Demo-only content for the /design-system showcase. Real event, society and
// speaker data will come from MongoDB; nothing here is imported by components.
import type { EventTimelineDay } from "@/components/events/EventTimeline";
import type { EventCategory, RegistrationState } from "@/types/event";

export const categories: EventCategory[] = [
  "workshop",
  "competition",
  "talk",
  "networking",
  "social",
];

export const statuses: RegistrationState[] = [
  "open",
  "limited",
  "closed",
  "soon",
  "registered",
];

export const navLinks = [
  { label: "Foundations", href: "#foundations", active: true },
  { label: "Events", href: "#events" },
  { label: "Imagery", href: "#imagery" },
  { label: "Community", href: "#community" },
  { label: "States", href: "#states" },
  { label: "System", href: "#system" },
];

// Stand-in photography for demonstrating image treatments only. The real
// site needs commissioned event photography (see docs/ARCHITECTURE.md).
export const standIn = {
  hall: "https://picsum.photos/seed/ieee-week-hall/1200/900",
  lab: "https://picsum.photos/seed/ieee-week-lab/1200/900",
  crowd: "https://picsum.photos/seed/ieee-week-crowd/1200/900",
};

export const events = [
  {
    title: "Embedded Systems Bootcamp",
    society: "IEEE Computer Society",
    category: "workshop" as const,
    day: "14",
    month: "Oct",
    time: "10:00 to 13:00",
    venue: "Innovation Lab, Block C",
    status: "limited" as const,
    seatsLeft: 12,
  },
  {
    title: "Autonomous Robotics Challenge",
    society: "IEEE Robotics and Automation Society",
    category: "competition" as const,
    day: "15",
    month: "Oct",
    time: "09:00 to 17:00",
    venue: "Central Arena",
    status: "open" as const,
  },
  {
    title: "Grid Futures: A Fireside Talk",
    society: "IEEE Power and Energy Society",
    category: "talk" as const,
    day: "16",
    month: "Oct",
    time: "15:30 to 16:30",
    venue: "Main Auditorium",
    status: "soon" as const,
  },
];

export const featuredEvent = {
  title: "Opening Keynote: Engineering the Next Decade",
  society: "IEEE Student Branch",
  category: "talk" as const,
  description:
    "Kick off the week with a look at the ideas shaping computing, energy and robotics, followed by an open floor with every society lead.",
  date: "Mon, 13 Oct, 09:30",
  venue: "Main Auditorium",
};

export const societies = [
  {
    name: "IEEE Computer Society",
    short: "CS",
    description: "Software, systems and the craft of building reliable things.",
    eventCount: 6,
  },
  {
    name: "IEEE Robotics and Automation Society",
    short: "RAS",
    description: "Machines that sense, decide and move.",
    eventCount: 4,
  },
  {
    name: "IEEE Women in Engineering",
    short: "WIE",
    description: "Mentorship and visibility across every discipline.",
    eventCount: 3,
  },
  {
    name: "IEEE Power and Energy Society",
    short: "PES",
    description: "Generation, storage and the grid that connects them.",
    eventCount: 5,
  },
];

export const speakers = [
  {
    name: "Dr. Meera Raghavan",
    role: "Principal Engineer",
    org: "Voltaic Systems",
    topic: "Reliable firmware at scale",
    tone: "blue" as const,
  },
  {
    name: "Arjun Nair",
    role: "Robotics Lead",
    org: "Kestrel Labs",
    topic: "Perception without cameras",
    tone: "deep" as const,
  },
  {
    name: "Tanvi Deshpande",
    role: "Grid Analyst",
    org: "Southern Power Board",
    topic: "Storage meets demand",
    tone: "cyan" as const,
  },
  {
    name: "Rohan Iyer",
    role: "Chair",
    org: "IEEE Student Branch",
    topic: "Opening remarks",
    tone: "orange" as const,
  },
];

export const timelineDays: EventTimelineDay[] = [
  {
    label: "Day 1",
    date: "Mon, 13 Oct",
    items: [
      {
        time: "09:30",
        endTime: "10:30",
        title: "Opening keynote",
        society: "IEEE Student Branch",
        venue: "Main Auditorium",
        category: "talk",
        status: "open",
      },
      {
        time: "11:00",
        endTime: "13:00",
        title: "Embedded Systems Bootcamp",
        society: "IEEE Computer Society",
        venue: "Innovation Lab",
        category: "workshop",
        status: "limited",
        live: true,
      },
    ],
  },
  {
    label: "Day 2",
    date: "Tue, 14 Oct",
    items: [
      {
        time: "10:00",
        endTime: "16:00",
        title: "Autonomous Robotics Challenge",
        society: "IEEE Robotics and Automation Society",
        venue: "Central Arena",
        category: "competition",
        status: "soon",
      },
      {
        time: "17:00",
        endTime: "18:30",
        title: "Alumni mixer",
        society: "IEEE Women in Engineering",
        venue: "Courtyard",
        category: "networking",
        status: "open",
      },
    ],
  },
];

export const filterOptions = [
  { value: "all", label: "All events", count: 24 },
  ...categories.map((value, index) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
    count: 9 - index * 2,
  })),
];

export const societyOptions = [
  { value: "cs", label: "IEEE Computer Society" },
  { value: "ras", label: "IEEE Robotics and Automation Society" },
  { value: "wie", label: "IEEE Women in Engineering" },
  { value: "pes", label: "IEEE Power and Energy Society" },
];

export const typeRoles: {
  role: string;
  style: string;
  spec: string;
  sample: string;
  cls: string;
}[] = [
  {
    role: "Display",
    style: "Bricolage 700",
    spec: "48 to 108px / 0.94",
    sample: "Built to be seen",
    cls: "type-display",
  },
  {
    role: "Hero",
    style: "Bricolage 700",
    spec: "40 to 76px / 1.0",
    sample: "Every society, one week",
    cls: "type-hero",
  },
  {
    role: "H1",
    style: "Bricolage 700",
    spec: "34 to 56px / 1.04",
    sample: "Events for every curiosity",
    cls: "type-h1",
  },
  {
    role: "H2",
    style: "Bricolage 650",
    spec: "28 to 44px / 1.1",
    sample: "Workshops that ship something",
    cls: "type-h2",
  },
  {
    role: "H3",
    style: "Bricolage 650",
    spec: "21 to 28px / 1.2",
    sample: "Register before seats run out",
    cls: "type-h3",
  },
  {
    role: "Title",
    style: "Bricolage 600",
    spec: "18 to 21px / 1.3",
    sample: "Embedded Systems Bootcamp",
    cls: "type-title",
  },
  {
    role: "Body large",
    style: "Geist 400",
    spec: "17 to 20px / 1.6",
    sample:
      "A week of talks, workshops and competitions hosted by every IEEE society on campus.",
    cls: "type-body-lg",
  },
  {
    role: "Body",
    style: "Geist 400",
    spec: "16px / 1.65",
    sample:
      "Bring a laptop, a curious mind and a teammate. We provide the boards, the mentors and the coffee.",
    cls: "type-body",
  },
  {
    role: "Body small",
    style: "Geist 400",
    spec: "14px / 1.55",
    sample: "Lunch is included for registered participants on both days.",
    cls: "type-body-sm",
  },
  {
    role: "Label",
    style: "Geist 600",
    spec: "14px / 1.3",
    sample: "Registration open",
    cls: "type-label",
  },
  {
    role: "Eyebrow",
    style: "Geist 650, caps",
    spec: "12px / +0.14em",
    sample: "Featured event",
    cls: "type-eyebrow",
  },
  {
    role: "Caption",
    style: "Geist 400",
    spec: "13px / 1.45",
    sample: "Photo: 2025 robotics finals",
    cls: "type-caption",
  },
  {
    role: "Metadata",
    style: "Geist Mono 500",
    spec: "13px / tabular",
    sample: "10:00 to 13:00 IST",
    cls: "type-meta",
  },
];
