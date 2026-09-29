import Image from "next/image";
import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * IEEE Week imagery rules, encoded once:
 *  - aspect: fixed ratios per role (hero 4/5 or 3/2, card 4/3, speaker 4/5,
 *    society 1/1, gallery 3/2 or 16/9)
 *  - shape: `leaf` is the signature crop for hero and featured imagery
 *  - focal: object-position, so a crop never decapitates a speaker
 *  - treatment: one shared color grade so mixed photography feels cohesive
 */
export type PhotoAspect =
  "square" | "4/3" | "4/5" | "3/2" | "16/9" | "21/9" | "3/4";
export type PhotoShape = "none" | "card" | "leaf" | "leaf-flip" | "circle";
export type PhotoFocal =
  "center" | "top" | "bottom" | "left" | "right" | "face";
export type PhotoTreatment = "natural" | "brand" | "scrim";
export type PhotoTone = "blue" | "cyan" | "purple" | "orange" | "deep";

const aspectStyles: Record<PhotoAspect, string> = {
  square: "aspect-square",
  "4/3": "aspect-4/3",
  "4/5": "aspect-4/5",
  "3/2": "aspect-3/2",
  "16/9": "aspect-video",
  "21/9": "aspect-21/9",
  "3/4": "aspect-3/4",
};

const shapeStyles: Record<PhotoShape, string> = {
  none: "",
  card: "rounded-card",
  leaf: "shape-leaf",
  "leaf-flip": "shape-leaf-flip",
  circle: "rounded-full",
};

const focalStyles: Record<PhotoFocal, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  face: "object-[50%_22%]",
};

// Placeholder compositions: tinted field, one large cropped circle in the
// brand hue, one small counter-circle, and cropped rings.
const toneStyles: Record<
  PhotoTone,
  { field: string; big: string; small: string; ring: string }
> = {
  blue: {
    field: "bg-surface-brand",
    big: "bg-brand-blue",
    small: "bg-brand-cyan",
    ring: "deco-rings",
  },
  cyan: {
    field: "bg-surface-accent",
    big: "bg-brand-cyan",
    small: "bg-brand-blue",
    ring: "deco-rings deco-rings-cyan",
  },
  purple: {
    field: "bg-surface-special",
    big: "bg-brand-purple",
    small: "bg-brand-cyan",
    ring: "deco-rings",
  },
  orange: {
    field: "bg-surface-highlight",
    big: "bg-brand-orange",
    small: "bg-brand-blue",
    ring: "deco-rings",
  },
  deep: {
    field: "bg-surface-deep",
    big: "bg-brand-blue",
    small: "bg-brand-cyan",
    ring: "deco-rings deco-rings-on-deep",
  },
};

export interface PhotoProps {
  /** Omit to render an on-brand placeholder composition. */
  src?: string;
  alt?: string;
  /** Names the intended shot when `src` is missing. */
  placeholderLabel?: string;
  /** Hue of the placeholder composition. */
  tone?: PhotoTone;
  /** Fixed ratio; omit when a parent sizes the photo (`absolute inset-0`). */
  aspect?: PhotoAspect;
  shape?: PhotoShape;
  focal?: PhotoFocal;
  treatment?: PhotoTreatment;
  /** Image `sizes` hint. */
  sizes?: string;
  /** Preload: only for the above-the-fold hero image. */
  priority?: boolean;
  className?: string;
}

export function Photo({
  src,
  alt = "",
  placeholderLabel,
  tone = "blue",
  aspect,
  shape = "none",
  focal = "center",
  treatment = "natural",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority,
  className,
}: PhotoProps) {
  const t = toneStyles[tone];
  return (
    <div
      className={cn(
        "bg-surface-muted relative isolate overflow-hidden",
        aspect && aspectStyles[aspect],
        shapeStyles[shape],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes}
          className={cn(
            "duration-slow ease-emphasis object-cover transition-transform group-hover:scale-[1.04] motion-reduce:group-hover:scale-100",
            focalStyles[focal],
          )}
        />
      ) : (
        <div
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
          className={cn("absolute inset-0 overflow-hidden", t.field)}
        >
          <div
            className={cn("absolute inset-0", t.ring)}
            style={{ "--ring-at": "0% 0%" } as CSSProperties}
          />
          <div
            className={cn(
              "duration-slow ease-emphasis absolute -right-[14%] -bottom-[28%] aspect-square w-[74%] rounded-full transition-transform group-hover:scale-105 motion-reduce:group-hover:scale-100",
              t.big,
            )}
          />
          <div
            className={cn(
              "absolute right-[52%] bottom-[14%] aspect-square w-[15%] rounded-full",
              t.small,
            )}
          />
          {placeholderLabel && (
            <span
              className={cn(
                "type-meta absolute top-3.5 left-4 max-w-[60%]",
                tone === "deep"
                  ? "text-content-on-deep-secondary"
                  : "text-content-secondary",
              )}
            >
              {placeholderLabel}
            </span>
          )}
        </div>
      )}
      {src && treatment === "brand" && (
        <div
          aria-hidden="true"
          className="bg-brand-blue/20 pointer-events-none absolute inset-0 mix-blend-soft-light"
        />
      )}
      {src && treatment !== "natural" && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-linear-to-t to-transparent",
            treatment === "scrim"
              ? "from-brand-dark/85 via-brand-dark/25"
              : "from-brand-dark/30 via-transparent",
          )}
        />
      )}
    </div>
  );
}
