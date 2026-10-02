import Link from "next/link";
import { type ReactNode } from "react";
import { GlassSurface } from "@/components/effects/GlassSurface";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { SERIES_NAME } from "@/lib/site/config";
import { cn } from "@/lib/utils";
import { NavMobileMenu } from "./NavMobileMenu";

export interface NavLink {
  label: string;
  href: string;
  /** Marks the current page (`aria-current="page"`). */
  active?: boolean;
}

export interface NavCta {
  label: string;
  href: string;
}

export interface NavBarProps {
  links?: NavLink[];
  cta?: NavCta;
  /** Pins the bar to the top of the viewport while scrolling. */
  sticky?: boolean;
  /** Edition label beside the wordmark, e.g. "2026". */
  year?: string;
  /** Extra controls before the CTA. */
  actions?: ReactNode;
  className?: string;
}

/**
 * A contained GLASS bar floating just below the viewport edge, so content
 * scrolls behind it. GRID gives it structure: brand, a hairline divider, then
 * the ruled link row. Server component; only the mobile disclosure ships
 * client JS. Pair with `id="main-content"` on <main> for the skip link.
 *
 * The series name wraps rather than truncates, so any `SERIES_NAME` fits.
 */
export function NavBar({
  links = [],
  cta,
  sticky = true,
  year,
  actions,
  className,
}: NavBarProps) {
  return (
    <header
      className={cn(
        "pointer-events-none z-40 pt-3",
        sticky ? "sticky top-0" : "relative",
        className,
      )}
    >
      <a
        href="#main-content"
        className="rounded-control bg-interactive-primary type-label text-content-on-brand pointer-events-auto sr-only z-50 px-4 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <div className="container-page">
        <GlassSurface className="rounded-control pointer-events-auto">
          <div className="flex min-h-14 items-center gap-4 py-1.5 pr-2 pl-4 lg:gap-6 lg:pr-3 lg:pl-5">
            <Link
              href="/"
              className="rounded-tag font-display text-content-primary flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 text-[1.0625rem] leading-[1.1] font-bold tracking-[-0.03em] [overflow-wrap:anywhere] no-underline min-[26rem]:text-[1.125rem] lg:flex-none lg:text-[1.25rem]"
            >
              <span>{SERIES_NAME}</span>
              {year && (
                <small className="type-tech text-content-brand">{year}</small>
              )}
            </Link>

            <span
              aria-hidden="true"
              className="bg-line my-2 hidden w-px self-stretch lg:block"
            />

            <nav aria-label="Primary" className="hidden self-stretch lg:block">
              <ul className="m-0 flex h-full list-none items-stretch gap-7 p-0">
                {links.map((link) => (
                  <li key={link.href + link.label} className="flex">
                    <Link
                      href={link.href}
                      aria-current={link.active ? "page" : undefined}
                      className="type-tech text-content-secondary duration-fast ease-standard hover:text-content-primary aria-[current=page]:text-content-brand after:bg-interactive-primary after:duration-base after:ease-emphasis relative flex items-center no-underline transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform aria-[current=page]:after:scale-x-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 lg:ml-auto">
              {actions}
              {cta && (
                <SpecularButton
                  href={cta.href}
                  size="sm"
                  arrow
                  className="max-lg:hidden"
                >
                  {cta.label}
                </SpecularButton>
              )}
              <NavMobileMenu links={links} cta={cta} />
            </div>
          </div>
        </GlassSurface>
      </div>
    </header>
  );
}
