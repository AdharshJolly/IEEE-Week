import { ArrowUpRight, Users } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface SocietyCardProps {
  name: string;
  /** Short code shown in the mark tile when no logo, e.g. "CS", "RAS". */
  short?: string;
  /** Official society logo URL (preferred over `short`). */
  logo?: string;
  description?: string;
  eventCount?: number;
  href?: string;
  className?: string;
}

export function SocietyCard({
  name,
  short,
  logo,
  description,
  eventCount,
  href,
  className,
}: SocietyCardProps) {
  return (
    <Card
      as="article"
      href={href}
      tone="solid"
      className={cn("gap-5 p-6", className)}
    >
      <div className="flex items-start justify-between">
        <span className="type-meta rounded-control bg-surface-brand text-content-brand relative flex size-14 items-center justify-center overflow-hidden font-semibold">
          {logo ? (
            <Image
              src={logo}
              alt=""
              fill
              unoptimized
              sizes="3.5rem"
              className="object-contain p-2"
            />
          ) : short ? (
            short
          ) : (
            <Users className="size-5" strokeWidth={1.75} aria-hidden="true" />
          )}
        </span>
        {href && (
          <ArrowUpRight
            className="text-content-brand duration-base ease-emphasis size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="type-title">{name}</h3>
        {description && (
          <p className="type-body-sm text-content-secondary">{description}</p>
        )}
      </div>
      {eventCount !== undefined && (
        <p className="type-meta text-content-tertiary mt-auto">
          {String(eventCount).padStart(2, "0")}{" "}
          {eventCount === 1 ? "event" : "events"}
        </p>
      )}
    </Card>
  );
}
