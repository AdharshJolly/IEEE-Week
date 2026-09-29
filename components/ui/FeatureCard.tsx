import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FeatureVariant = "plain" | "tint" | "deep";

export interface FeatureCardProps {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  /**
   * `plain` is an editorial column with a top rule (no box); `tint` is a
   * quiet panel; `deep` is the single high-contrast moment in a group.
   */
  variant?: FeatureVariant;
  /** Heading level for the title. */
  headingAs?: "h2" | "h3" | "h4";
  children?: ReactNode;
  className?: string;
}

const variantStyles: Record<FeatureVariant, string> = {
  plain: "border-t border-line pt-6 hover:border-line-brand",
  tint: "rounded-card bg-surface-subtle p-6 sm:p-7",
  deep: "rounded-card bg-surface-deep p-6 text-content-on-deep sm:p-7",
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "plain",
  headingAs: Heading = "h3",
  children,
  className,
}: FeatureCardProps) {
  const deep = variant === "deep";
  return (
    <article
      data-surface={deep ? "deep" : undefined}
      className={cn(
        "duration-base ease-standard flex flex-col gap-4 transition-colors",
        variantStyles[variant],
        className,
      )}
    >
      {Icon && (
        <span
          className={cn(
            "rounded-control flex size-11 items-center justify-center",
            deep
              ? "bg-brand-cyan text-content-on-accent"
              : "bg-surface-brand text-content-brand",
          )}
        >
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
      )}
      <Heading className="type-title">{title}</Heading>
      {description && (
        <p
          className={cn(
            "type-body-sm",
            deep ? "text-content-on-deep-secondary" : "text-content-secondary",
          )}
        >
          {description}
        </p>
      )}
      {children}
    </article>
  );
}
