import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { type ReactNode } from "react";
import { BorderGlow } from "@/components/effects/BorderGlow";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types/event";
import { CategoryTag, categoryTone } from "./CategoryTag";
import { EventMeta, type EventMetaItem } from "./EventMeta";

export interface FeaturedEventCardProps {
  title: string;
  image?: string;
  imageAlt?: string;
  society?: string;
  category?: EventCategory;
  description?: ReactNode;
  date?: string;
  venue?: string;
  /**
   * `split`: bright panel with a leaf-cropped photo (default).
   * `overlay`: full-bleed photo with a navy scrim, for one hero moment.
   */
  layout?: "split" | "overlay";
  ctaLabel?: string;
  href?: string;
  /**
   * Proximity glow on the `split` layout, for the one interactive featured
   * surface on a page. Replaces the cursor highlight on that card.
   */
  glow?: boolean;
  className?: string;
}

export function FeaturedEventCard({
  title,
  image,
  imageAlt,
  society,
  category,
  description,
  date,
  venue,
  layout = "split",
  ctaLabel = "View event",
  href,
  glow = false,
  className,
}: FeaturedEventCardProps) {
  const overlay = layout === "overlay";
  const meta: EventMetaItem[] = [];
  if (date) meta.push({ icon: CalendarDays, label: "Date", value: date });
  if (venue) meta.push({ icon: MapPin, label: "Venue", value: venue });
  const tone = category ? categoryTone[category] : "blue";

  const content = (
    <div
      className={cn(
        "relative z-10 flex flex-col gap-4",
        overlay
          ? "mt-auto p-6 sm:p-10"
          : "justify-center p-4 pb-6 sm:p-6 lg:p-10",
      )}
    >
      {category && (
        <div>
          <CategoryTag category={category} solid={overlay} />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {society && (
          <p
            className={cn(
              "type-meta",
              overlay
                ? "text-content-on-deep-secondary"
                : "text-content-tertiary",
            )}
          >
            {society}
          </p>
        )}
        <h3
          className={cn(
            "type-h2",
            overlay ? "text-content-on-deep" : "text-content-primary",
          )}
        >
          {title}
        </h3>
      </div>
      {description && (
        <p
          className={cn(
            "type-body max-w-prose",
            overlay
              ? "text-content-on-deep-secondary"
              : "text-content-secondary",
          )}
        >
          {description}
        </p>
      )}
      {meta.length > 0 && <EventMeta compact onDeep={overlay} items={meta} />}
      {href && (
        <span
          className={cn(
            "type-label mt-1 inline-flex items-center gap-2",
            overlay ? "text-content-on-deep-accent" : "text-content-brand",
          )}
        >
          {ctaLabel}
          <ArrowUpRight
            className="duration-base ease-emphasis size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <Card
        as="article"
        tone="deep"
        radius="panel"
        href={href}
        className={cn("min-h-[28rem] sm:min-h-[32rem]", className)}
      >
        <Photo
          src={image}
          alt={imageAlt}
          tone="deep"
          className="absolute inset-0"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
        <div
          className="from-brand-dark/95 via-brand-dark/55 absolute inset-0 bg-linear-to-t via-45% to-transparent"
          aria-hidden="true"
        />
        {content}
      </Card>
    );
  }

  const split = (
    <Card
      as="article"
      tone={glow ? "bare" : "subtle"}
      radius="panel"
      href={href}
      className={cn(
        "p-3 sm:p-4 lg:flex-row lg:items-stretch",
        !glow && className,
      )}
    >
      <Photo
        src={image}
        alt={imageAlt}
        tone={tone}
        shape="leaf"
        focal="face"
        className="aspect-4/3 lg:aspect-auto lg:min-h-[26rem] lg:flex-[1.15]"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="flex flex-col lg:flex-1">{content}</div>
    </Card>
  );

  if (!glow) return split;
  return (
    <BorderGlow surface="subtle" radius="panel" className={className}>
      {split}
    </BorderGlow>
  );
}
