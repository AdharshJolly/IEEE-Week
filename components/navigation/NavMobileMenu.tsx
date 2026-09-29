"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavCta, NavLink } from "./NavBar";

interface NavMobileMenuProps {
  links: NavLink[];
  cta?: NavCta;
}

/**
 * Below `lg` the primary links collapse into this disclosure. Escape closes it
 * and returns focus to the toggle. The three-line icon morphs into an X with
 * transforms only.
 */
export function NavMobileMenu({ links, cta }: NavMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const line =
    "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-base ease-emphasis";

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="rounded-control text-content-primary duration-fast hover:bg-interactive-subtle-hover relative size-11 transition-colors"
      >
        <span
          aria-hidden="true"
          className={cn(line, open ? "top-1/2 rotate-45" : "top-[15px]")}
        />
        <span
          aria-hidden="true"
          className={cn(
            line,
            "top-1/2 transition-opacity",
            open && "opacity-0",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(line, open ? "top-1/2 -rotate-45" : "top-[27px]")}
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="rounded-card border-line bg-surface-elevated shadow-overlay absolute inset-x-0 top-full mt-2 border p-3"
        >
          <ul className="m-0 mb-3 flex list-none flex-col p-0">
            {links.map((link, index) => (
              <li
                key={link.href + link.label}
                className="rise-in"
                style={{ "--i": index } as CSSProperties}
              >
                <Link
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="type-title rounded-control text-content-secondary hover:bg-interactive-subtle-hover hover:text-content-primary aria-[current=page]:bg-surface-brand aria-[current=page]:text-content-brand flex h-14 items-center px-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {cta && (
            <Button
              href={cta.href}
              fullWidth
              arrow
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
