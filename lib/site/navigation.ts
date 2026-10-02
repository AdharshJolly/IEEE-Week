import type { NavLink } from "@/components/navigation/NavBar";

/**
 * Primary navigation shared by every page: three destinations only. Schedule
 * and societies content stays on the homepage and About page; it is just not
 * a primary destination.
 */
export function getNavLinks(activeHref?: string): NavLink[] {
  const links: NavLink[] = [
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  return links.map((link) => ({ ...link, active: link.href === activeHref }));
}
