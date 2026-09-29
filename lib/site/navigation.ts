import type { NavLink } from "@/components/navigation/NavBar";

/** Primary navigation shared by every page. Section links target the homepage. */
export function getNavLinks(activeHref?: string): NavLink[] {
  const links: NavLink[] = [
    { label: "Events", href: "/events" },
    { label: "Schedule", href: "/#schedule" },
    { label: "About", href: "/#about" },
    { label: "Societies", href: "/#societies" },
  ];
  return links.map((link) => ({ ...link, active: link.href === activeHref }));
}
