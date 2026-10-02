import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SERIES_NAME } from "@/lib/site/config";
import type { NavLink } from "./NavBar";

export interface SiteFooterProps {
  organization: string;
  year: string;
  links: NavLink[];
}

/**
 * Closing band on deep navy: series name at display size, then a ruled
 * two-column index (presenter, navigation). Only supplied facts appear.
 */
export function SiteFooter({ organization, year, links }: SiteFooterProps) {
  return (
    <footer
      data-surface="deep"
      className="bg-surface-deep text-content-on-deep"
    >
      <Container className="flex flex-col gap-12 py-14">
        <p className="type-hero min-w-0 [overflow-wrap:anywhere]">
          <span className="text-content-on-deep-accent">{SERIES_NAME}</span>{" "}
          <span className="text-content-on-deep-secondary">{year}</span>
        </p>

        <div className="border-line-on-deep grid gap-10 border-t pt-8 md:grid-cols-12 md:gap-x-10">
          <div className="flex flex-col gap-4 md:col-span-6">
            <p className="type-tech text-content-on-deep-secondary">
              Presented by
            </p>
            <div className="relative h-12 w-28">
              <Image
                src="/images/CHRIST Uni.png"
                alt="CHRIST University Logo"
                fill
                className="object-contain object-left brightness-0 invert"
                unoptimized
              />
            </div>
            <p className="type-body-sm text-content-on-deep-secondary max-w-sm">
              {organization}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4 md:col-start-9">
            <p className="type-tech text-content-on-deep-secondary mb-4">
              Index
            </p>
            <ol className="m-0 flex list-none flex-col p-0">
              {links.map((link, index) => (
                <li key={link.href + link.label} className="m-0">
                  <Link
                    href={link.href}
                    className="type-label text-content-on-deep-secondary hover:text-content-on-deep border-line-on-deep duration-fast ease-standard flex items-center gap-4 border-b py-3 no-underline transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="type-index text-content-on-deep-accent"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
