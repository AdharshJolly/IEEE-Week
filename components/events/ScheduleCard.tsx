import { MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { EventCategory, RegistrationState } from "@/types/event";
import { CategoryTag } from "./CategoryTag";
import { RegistrationStatus } from "./RegistrationStatus";

export interface ScheduleCardProps {
  /** Start time, e.g. "10:00". */
  time: string;
  endTime?: string;
  title: string;
  society?: string;
  venue?: string;
  category?: EventCategory;
  status?: RegistrationState;
  /** Tinted highlight for the current or next session. */
  active?: boolean;
  /** "Live now" marker with a soft pulse. */
  live?: boolean;
  /** Makes the whole row a link. */
  href?: string;
  className?: string;
}

export function ScheduleCard({
  time,
  endTime,
  title,
  society,
  venue,
  category,
  status,
  active = false,
  live = false,
  href,
  className,
}: ScheduleCardProps) {
  const classes = cn(
    "group flex items-stretch overflow-hidden rounded-card border text-content-primary transition-[box-shadow,border-color,background-color] duration-base ease-standard",
    active
      ? "border-line-brand bg-surface-subtle"
      : "border-line bg-surface-default",
    href && "hover:border-line-brand hover:shadow-raised",
    className,
  );

  const body = (
    <>
      <div
        className={cn(
          "flex w-22 shrink-0 flex-col justify-center gap-0.5 border-r px-4 py-4 sm:w-28",
          active ? "border-line-brand" : "border-line-subtle",
        )}
      >
        <time className="font-display text-xl leading-none font-bold tracking-tight tabular-nums">
          {time}
        </time>
        {endTime && (
          <span className="type-meta text-content-tertiary">{endTime}</span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-4 py-4 sm:px-5">
        {live && (
          <span className="type-eyebrow text-status-success flex items-center gap-2">
            <span
              className="size-2 animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-current motion-reduce:animate-none"
              aria-hidden="true"
            />
            Live now
          </span>
        )}
        <h3 className="type-title">{title}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {category && <CategoryTag category={category} size="sm" />}
          {society && (
            <span className="type-meta text-content-tertiary">{society}</span>
          )}
          {venue && (
            <span className="type-body-sm text-content-secondary inline-flex items-center gap-1">
              <MapPin
                className="size-3.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {venue}
            </span>
          )}
          {status && <RegistrationStatus status={status} plain />}
        </div>
      </div>
    </>
  );

  return href ? (
    <Link href={href} className={cn(classes, "no-underline")}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
