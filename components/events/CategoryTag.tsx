import {
  Mic,
  PartyPopper,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { PhotoTone } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types/event";

/**
 * One hue per category, all drawn from the IEEE palette:
 * workshop = blue, competition = purple, talk = dark blue,
 * networking = cyan, social = orange.
 */
export const CATEGORIES: Record<
  EventCategory,
  { label: string; icon: LucideIcon; surface: string; icon_ink: string }
> = {
  workshop: {
    label: "Workshop",
    icon: Wrench,
    surface: "bg-cat-workshop-surface",
    icon_ink: "text-cat-workshop",
  },
  competition: {
    label: "Competition",
    icon: Trophy,
    surface: "bg-cat-competition-surface",
    icon_ink: "text-cat-competition",
  },
  talk: {
    label: "Talk",
    icon: Mic,
    surface: "bg-cat-talk-surface",
    icon_ink: "text-cat-talk",
  },
  networking: {
    label: "Networking",
    icon: Users,
    surface: "bg-cat-networking-surface",
    icon_ink: "text-cat-networking",
  },
  social: {
    label: "Social",
    icon: PartyPopper,
    surface: "bg-cat-social-surface",
    icon_ink: "text-cat-social",
  },
};

/** Placeholder hue for a category's imagery. */
export const categoryTone: Record<EventCategory, PhotoTone> = {
  workshop: "blue",
  competition: "purple",
  talk: "deep",
  networking: "cyan",
  social: "orange",
};

export interface CategoryTagProps {
  category: EventCategory;
  size?: "sm" | "md";
  /** Opaque white surface, for placement over photography. */
  solid?: boolean;
  /** Override the default label. */
  label?: string;
  className?: string;
}

/** Icon + text: category is never carried by color alone. */
export function CategoryTag({
  category,
  size = "md",
  solid = false,
  label,
  className,
}: CategoryTagProps) {
  const {
    label: defaultLabel,
    icon: Icon,
    surface,
    icon_ink,
  } = CATEGORIES[category];
  return (
    <span
      className={cn(
        "rounded-tag text-content-primary inline-flex items-center font-semibold whitespace-nowrap",
        size === "sm"
          ? "type-caption h-5.5 gap-1.5 px-2"
          : "type-body-sm h-7 gap-1.5 px-2.5",
        solid ? "bg-surface-elevated shadow-rest" : surface,
        className,
      )}
    >
      <Icon
        className={cn(size === "sm" ? "size-3" : "size-3.5", icon_ink)}
        strokeWidth={2}
        aria-hidden="true"
      />
      {label ?? defaultLabel}
    </span>
  );
}
