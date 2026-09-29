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
  href?: string;
  /** Layout style. 'vertical' is compact for grids. 'horizontal' is roomy for lists. */
  layout?: "vertical" | "horizontal";
  className?: string;
}

export function SocietyCard({
  name,
  short,
  logo,
  description,
  href,
  layout = "vertical",
  className,
}: SocietyCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <Card
      as="article"
      href={href}
      tone="solid"
      className={cn(
        "gap-5 p-6",
        isHorizontal ? "sm:flex-row sm:items-start sm:p-8" : "",
        className
      )}
    >
      <div className={cn("flex items-start justify-between", isHorizontal ? "shrink-0" : "")}>
        <span
          className={cn(
            "type-meta relative flex items-center justify-center font-semibold",
            !logo && "rounded-control bg-surface-brand text-content-brand overflow-hidden",
            isHorizontal ? "size-20 sm:size-24" : "size-16 sm:size-20"
          )}
        >
          {logo ? (
            <Image
              src={logo}
              alt=""
              fill
              unoptimized
              sizes={isHorizontal ? "6rem" : "5rem"}
              className="object-contain brightness-0"
            />
          ) : short ? (
            <span className={isHorizontal ? "text-lg sm:text-xl" : ""}>{short}</span>
          ) : (
            <Users className={cn(isHorizontal ? "size-7" : "size-5")} strokeWidth={1.75} aria-hidden="true" />
          )}
        </span>
        {href && !isHorizontal && (
          <ArrowUpRight
            className="text-content-brand duration-base ease-emphasis size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        )}
      </div>
      <div className={cn("flex flex-col gap-2", isHorizontal ? "flex-1 mt-1 sm:mt-0 sm:ml-2" : "")}>
        <div className="flex items-start justify-between gap-4">
          <h3 className={cn("type-title", isHorizontal ? "text-xl" : "")}>{name}</h3>
          {href && isHorizontal && (
            <ArrowUpRight
              className="text-content-brand duration-base ease-emphasis size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          )}
        </div>
        {description && (
          <p className={cn("text-content-secondary", isHorizontal ? "type-body" : "type-body-sm")}>
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
