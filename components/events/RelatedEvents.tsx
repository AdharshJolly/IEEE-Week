import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/Section";
import { SERIES_NAME } from "@/lib/site/config";

export interface RelatedEventItem {
  id: string;
  href: string;
  title: string;
  dateLabel: string;
  societyNames: string[];
}

export function RelatedEvents({ items }: { items: RelatedEventItem[] }) {
  if (items.length === 0) return null;
  return (
    <Section spacing="md" aria-labelledby="related-title">
      <div className="flex flex-col gap-10">
        <SectionHeading
          id="related-title"
          eyebrow="Related events"
          title={`Also at ${SERIES_NAME}.`}
        />
        <ul className="border-line m-0 grid list-none border-t p-0 md:grid-cols-3 md:gap-x-8">
          {items.map((item) => (
            <li
              key={item.id}
              className="border-line m-0 border-b md:border-b-0"
            >
              <Link
                href={item.href}
                className="group hover:bg-surface-subtle duration-base ease-standard flex h-full flex-col gap-3 py-6 no-underline transition-colors md:px-2"
              >
                <span className="type-eyebrow text-content-brand">
                  {item.dateLabel}
                </span>
                <span className="flex items-start justify-between gap-3">
                  <span className="type-title text-content-primary text-balance">
                    {item.title}
                  </span>
                  <ArrowUpRight
                    className="text-content-brand duration-base ease-emphasis mt-0.5 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <span className="type-body-sm text-content-secondary">
                  {item.societyNames.join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
