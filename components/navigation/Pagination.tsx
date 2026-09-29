import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  /** Builds the URL for a page, e.g. `(p) => `/events?page=${p}``. */
  getHref: (page: number) => string;
  className?: string;
}

const itemStyles =
  "type-meta inline-flex h-11 min-w-11 items-center justify-center rounded-control px-2 font-medium transition-colors duration-fast ease-standard";

/** 1 … 4 [5] 6 … 12 - always the ends plus a window around the current page. */
function pageWindow(page: number, pageCount: number): (number | "gap")[] {
  const pages = new Set(
    [1, pageCount, page - 1, page, page + 1].filter(
      (p) => p >= 1 && p <= pageCount,
    ),
  );
  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("gap");
    result.push(p);
  });
  return result;
}

export function Pagination({
  page,
  pageCount,
  getHref,
  className,
}: PaginationProps) {
  const arrow = (
    target: number,
    label: string,
    disabled: boolean,
    icon: React.ReactNode,
  ) =>
    disabled ? (
      <span
        aria-disabled="true"
        aria-label={label}
        className={cn(
          itemStyles,
          "text-interactive-disabled-content cursor-not-allowed",
        )}
      >
        {icon}
      </span>
    ) : (
      <Link
        href={getHref(target)}
        aria-label={label}
        className={cn(
          itemStyles,
          "text-content-secondary hover:bg-surface-brand hover:text-content-primary",
        )}
      >
        {icon}
      </Link>
    );

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        <li>
          {arrow(
            page - 1,
            "Previous page",
            page <= 1,
            <ChevronLeft className="size-4" aria-hidden="true" />,
          )}
        </li>
        {pageWindow(page, pageCount).map((item, index) => (
          <li key={item === "gap" ? `gap-${index}` : item}>
            {item === "gap" ? (
              <span
                className="text-content-muted inline-flex w-8 justify-center"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <Link
                href={getHref(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  itemStyles,
                  item === page
                    ? "bg-interactive-primary text-content-on-brand"
                    : "text-content-secondary hover:bg-surface-brand hover:text-content-primary",
                )}
              >
                {item}
              </Link>
            )}
          </li>
        ))}
        <li>
          {arrow(
            page + 1,
            "Next page",
            page >= pageCount,
            <ChevronRight className="size-4" aria-hidden="true" />,
          )}
        </li>
      </ul>
    </nav>
  );
}
