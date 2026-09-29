import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page. */
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="type-body-sm m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="text-content-tertiary flex items-center gap-1.5"
            >
              {item.href && !current ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-tag text-content-secondary duration-fast hover:text-content-brand underline-offset-4 transition-colors hover:underline",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={current ? "page" : undefined}
                  className="text-content-primary font-medium"
                >
                  {item.label}
                </span>
              )}
              {!current && (
                <ChevronRight
                  className="size-3.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
