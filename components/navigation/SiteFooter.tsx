import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { NavLink } from "./NavBar";

export interface SiteFooterProps {
  organization: string;
  year: string;
  links: NavLink[];
}

export function SiteFooter({ organization, year, links }: SiteFooterProps) {
  return (
    <footer
      data-surface="deep"
      className="bg-surface-deep text-content-on-deep"
    >
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-md flex-col gap-4">
          <div className="relative h-12 w-28">
            <Image 
              src="/images/CHRIST Uni.png" 
              alt="CHRIST University Logo" 
              fill 
              className="object-contain object-left brightness-0 invert" 
              unoptimized
            />
          </div>
          <p className="font-display text-2xl font-bold tracking-tight">
            <span className="text-content-on-deep-accent">IEEE</span> Week{" "}
            {year}
          </p>
          <p className="type-body-sm text-content-on-deep-secondary">
            Presented by {organization}.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="type-label text-content-on-deep-secondary hover:text-content-on-deep duration-fast ease-standard transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
