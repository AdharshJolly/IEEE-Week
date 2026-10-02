import type { EventSummary, Society } from "@/types/event";

/**
 * Static stand-in for the future MongoDB collections. Only facts supplied by
 * the organisers appear here; the schedule is tentative.
 * Consumers must go through `lib/events/index.ts`, never this file.
 */
export const mockSocieties: Society[] = [
  {
    id: "sb",
    short: "SB",
    name: "IEEE CHRIST University Student Branch Chapter",
    logo: "/images/SB.png",
    description:
      "The core student body connecting all technical chapters on campus. The Student Branch serves as the central hub for IEEE activities at CHRIST University, coordinating cross-disciplinary events, fostering professional development, and helping students navigate their engineering careers.",
  },
  {
    id: "cis",
    short: "CIS",
    name: "Computational Intelligence Society",
    logo: "/images/CIS.png",
    description:
      "The IEEE Computational Intelligence Society focuses on the theory, design, application, and development of biologically and linguistically motivated computational paradigms. We host regular workshops diving deep into neural networks, evolutionary algorithms, fuzzy systems, and hybrid intelligent systems to solve real-world problems.",
  },
  {
    id: "vts",
    short: "VTS",
    name: "Vehicular Technology Society",
    logo: "/images/VTS.png",
    description:
      "The IEEE Vehicular Technology Society connects engineers and scientists driving the future of land, airborne, and maritime mobile services. Our members work on everything from cellular networks and automotive electronics to transit systems, ensuring seamless global connectivity on the move.",
  },
  {
    id: "aess",
    short: "AESS",
    name: "Aerospace and Electronic Systems Society",
    logo: "/images/AESS.png",
    description:
      "Pioneering complex integrated systems for space, air, ocean, and ground environments. The AESS student chapter brings together enthusiasts interested in avionics, radar, sonar, navigation, and telemetry, bridging the gap between theoretical concepts and heavy-duty industrial applications.",
  },
  {
    id: "ras",
    short: "RAS",
    name: "Robotics and Automation Society",
    logo: "/images/RAS.png",
    description:
      "Machines that sense, decide, and move. We are a community of creators and researchers exploring the latest advancements in autonomous systems, robotic arms, computer vision, and the integration of AI into physical hardware. If you like building things that move, this is your home.",
  },
  {
    id: "grss",
    short: "GRSS",
    name: "Geoscience and Remote Sensing Society",
    logo: "/images/GRSS.png",
    description:
      "Applying advanced sensing technology to understand our Earth and its environment. GRSS focuses on the theory, concepts, and techniques of science and engineering as they apply to the remote sensing of the earth, oceans, atmosphere, and space.",
  },
  {
    id: "aps",
    short: "APS",
    name: "Antennas and Propagation Society",
    logo: "/images/APS.png",
    description:
      "Exploring electromagnetic waves, antennas, and their applications. Our society delves into the fundamental physics and practical engineering of transmitting and receiving information through space, critical for everything from 5G/6G to satellite communications.",
  },
  {
    id: "mtts",
    short: "MTTS",
    name: "Microwave Theory and Technology Society",
    logo: "/images/MTTS.png",
    description:
      "Innovating RF, microwave, and millimeter-wave technologies. We promote the advancement of microwave theory and its applications, bringing together students who want to master high-frequency electronics, circuit design, and wireless hardware.",
  },
  {
    id: "cs",
    short: "CS",
    name: "Computer Society",
    logo: "/images/CS.png",
    description:
      "The premier source for information, inspiration, and collaboration in computer science and engineering. We cover everything from software engineering and cloud computing to cybersecurity and algorithms, helping students craft reliable, scalable, and secure systems.",
  },
];

export const mockEvents: EventSummary[] = [
  {
    slug: "inauguration-ideathon",
    title: "Inauguration + Ideathon + Society Inaugurations",
    startDate: "2026-11-11",
    societyIds: ["cis", "vts", "ras"],
    tentative: true,
    category: "social",
    registrationState: "open",
    registrationsCount: 250,
    speakers: [
      {
        name: "Dr. Alice Turing",
        role: "Keynote Speaker",
        avatarUrl: "https://i.pravatar.cc/150?u=alice",
      },
      {
        name: "Bob Builder",
        role: "Ideathon Lead",
        avatarUrl: "https://i.pravatar.cc/150?u=bob",
      },
    ],
  },
  {
    slug: "llm-genai-workshop",
    title: "LLMs or Gen AI Workshop",
    startDate: "2026-11-12",
    societyIds: ["cis"],
    tentative: true,
    category: "workshop",
    registrationState: "limited",
    registrationsCount: 420,
  },
  {
    slug: "agent-forge",
    title: "IEEE Agent Forge AI Agents Workshop and Hackathon",
    startDate: "2026-11-13",
    endDate: "2026-11-14",
    societyIds: ["cs", "sb"],
    tentative: true,
    category: "competition",
    registrationState: "open",
    registrationsCount: 850,
  },
  {
    slug: "aerospace-geo-sensing-workshop",
    title: "Workshop on Aerospace and Geo-sensing Application",
    startDate: "2026-11-16",
    societyIds: ["grss", "aess"],
    tentative: true,
    category: "workshop",
    registrationState: "open",
    registrationsCount: 120,
  },
  {
    slug: "ai-antenna-design-workshop",
    title: "AI Driven Antenna Design Workshop",
    startDate: "2026-11-16",
    endDate: "2026-11-18",
    societyIds: ["aps", "mtts"],
    tentative: true,
    category: "workshop",
    registrationState: "open",
    registrationsCount: 95,
  },
];
