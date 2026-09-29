import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
 * A floating, inset bar rather than an edge-to-edge strip: it detaches from
 * the viewport edge so hero art can run behind it. Server component; only the
 * mobile disclosure ships client JS. Pair with `id="main-content"` on <main>
 * to make the skip link work.
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
        "pointer-events-none z-40 px-3 pt-3 sm:px-5 sm:pt-4",
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
      <div className="rounded-card border-line bg-surface-default/88 shadow-raised pointer-events-auto relative mx-auto max-w-[calc(var(--page-max)+2*var(--gutter))] border backdrop-blur-xl">
        <div className="flex h-16 items-center gap-6 px-4 sm:px-6">
          <Link
            href="/"
            className="rounded-tag font-display text-content-primary flex shrink-0 items-baseline gap-1.5 text-[1.375rem] font-bold tracking-[-0.03em] no-underline"
          >
            <span className="text-content-brand">IEEE</span>
            Week
            {year && (
              <small className="type-meta text-content-tertiary ml-1 hidden font-medium min-[26rem]:inline">
                {year}
              </small>
            )}
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="m-0 flex list-none items-center gap-1 p-0">
              {links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    aria-current={link.active ? "page" : undefined}
                    className="type-body rounded-control text-content-secondary duration-fast ease-standard hover:bg-interactive-subtle-hover hover:text-content-primary aria-[current=page]:bg-surface-brand aria-[current=page]:text-content-brand flex h-10 items-center px-3.5 font-medium transition-colors aria-[current=page]:font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            {actions}
            {cta && (
              <Button href={cta.href} size="sm" arrow className="max-lg:hidden">
                {cta.label}
              </Button>
            )}
            <NavMobileMenu links={links} cta={cta} />
          </div>
        </div>
      </div>
    </header>
  );
}
