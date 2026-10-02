"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { gsap, useGSAP, withMotionPreference } from "@/lib/motion/gsap";
import { counter } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

/** A digit place: its power of ten (100, 10, 1, 0.1 ...) or the decimal point. */
export type CounterPlace = number | ".";

export type CounterTone =
  | "inherit"
  | "primary"
  | "secondary"
  | "brand"
  | "on-brand"
  | "on-deep"
  | "on-deep-accent";

/** Surface the counter sits on; the edge fade blends into it. */
export type CounterSurface =
  "default" | "subtle" | "muted" | "brand" | "accent" | "deep";

const toneClass: Record<CounterTone, string> = {
  inherit: "",
  primary: "text-content-primary",
  secondary: "text-content-secondary",
  brand: "text-content-brand",
  "on-brand": "text-content-on-brand",
  "on-deep": "text-content-on-deep",
  "on-deep-accent": "text-content-on-deep-accent",
};

const toLength = (v: number | string) => (typeof v === "number" ? `${v}px` : v);

const cellHeight = "calc(1em + var(--counter-padding, 0px))";

export interface CounterProps {
  /** Any finite number. Negative values get a leading minus sign. */
  value: number;
  /** Fixed number of decimals (`2.5` with `2` reads 2.50). Default: as written. */
  decimals?: number;
  /**
   * Explicit digit places, most significant first, e.g. `[100, 10, 1]` pads to
   * three digits ("007") and `[10, 1, ".", 0.1]` fixes the layout. Digits the
   * places do not cover are not shown. Default: derived from `value`.
   */
  places?: CounterPlace[];
  /** Font size; a number is px. Default: inherits from the parent. */
  fontSize?: number | string;
  /** Extra vertical room per digit, added to 1em (number is px). */
  padding?: number | string;
  /** Space between digits (number is px). */
  gap?: number | string;
  borderRadius?: number | string;
  /** Left and right padding of the window (number is px). */
  horizontalPadding?: number | string;
  /** Raw colour override; prefer `tone`, which uses the semantic tokens. */
  textColor?: string;
  tone?: CounterTone;
  fontWeight?: CSSProperties["fontWeight"];
  surface?: CounterSurface;
  /** Edge fade height (number is px). Default is a token. */
  gradientHeight?: number | string;
  /** Edge fade colour at the very edge. Default: the `surface` token. */
  gradientFrom?: string;
  gradientTo?: string;
  /** Text read by assistive tech. Default: the formatted value. */
  label?: string;
  className?: string;
  containerStyle?: CSSProperties;
  counterStyle?: CSSProperties;
  digitStyle?: CSSProperties;
  topGradientStyle?: CSSProperties;
  bottomGradientStyle?: CSSProperties;
}

/** Plain decimal text, never exponent notation. */
function plain(n: number): string {
  const s = String(n);
  return /e/i.test(s)
    ? n.toLocaleString("en-US", {
        useGrouping: false,
        maximumFractionDigits: 20,
      })
    : s;
}

/** The place of each character of `text` ("12.5" -> [10, 1, ".", 0.1]). */
function placesOf(text: string): CounterPlace[] {
  const dot = text.indexOf(".");
  return [...text].map((ch, i) => {
    if (ch === ".") return ".";
    const exponent =
      dot === -1 ? text.length - i - 1 : i < dot ? dot - i - 1 : dot - i;
    return 10 ** exponent;
  });
}

/** Whole units of `place` in `value`; the epsilon absorbs 0.3 / 0.1 style error. */
const unitsAt = (value: number, place: number) =>
  Math.floor(value / place + 1e-9);

/** Vertical offset, in digit heights, of digit face `face` at roll position `pos`. */
function offsetOf(face: number, pos: number): number {
  const at = ((pos % 10) + 10) % 10;
  const offset = (10 + face - at) % 10;
  return offset > 5 ? offset - 10 : offset;
}

const transformFor = (face: number, pos: number) =>
  `translateY(${offsetOf(face, pos) * 100}%)`;

interface DigitProps {
  units: number;
  reduced: RefObject<boolean>;
  style?: CSSProperties;
}

/** One digit place: ten stacked faces, rolled by a damped spring. */
function Digit({ units, reduced, style }: DigitProps) {
  // Faces are painted from the spring directly. The initial position is fixed
  // at mount so React never rewrites the transforms the spring is driving.
  const [initial] = useState(units);
  const faces = useRef<(HTMLSpanElement | null)[]>([]);
  const sim = useRef({ pos: initial, vel: 0 });

  useEffect(() => {
    const s = sim.current;
    const paint = () =>
      faces.current.forEach((el, face) => {
        if (el) el.style.transform = transformFor(face, s.pos);
      });

    if (s.pos === units) return;
    if (reduced.current) {
      s.pos = units;
      s.vel = 0;
      paint();
      return;
    }

    // A jump of millions of units would spin for seconds. Start within
    // `maxTravel`, on the same face, so the roll is short and continuous.
    const distance = units - s.pos;
    if (Math.abs(distance) > counter.maxTravel) {
      const sign = Math.sign(distance);
      s.pos = units - ((distance % 10) + sign * 20);
    }

    const tick = (_time: number, deltaMs: number) => {
      // Fixed sub-steps keep the integration stable after a long frame.
      const dt = Math.min(deltaMs, 50) / 1000;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        const accel =
          counter.stiffness * (units - s.pos) - counter.damping * s.vel;
        s.vel += accel * h;
        s.pos += s.vel * h;
      }
      if (
        Math.abs(units - s.pos) < counter.restDelta &&
        Math.abs(s.vel) < counter.restDelta
      ) {
        s.pos = units;
        s.vel = 0;
        gsap.ticker.remove(tick);
      }
      paint();
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [units, reduced]);

  return (
    <span
      className="relative block w-[1ch] text-center tabular-nums"
      style={{ height: cellHeight, ...style }}
    >
      {Array.from({ length: 10 }, (_, face) => (
        <span
          key={face}
          ref={(el) => {
            faces.current[face] = el;
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: transformFor(face, initial) }}
        >
          {face}
        </span>
      ))}
    </span>
  );
}

/**
 * COUNTER primitive: quantitative information. A number whose digits roll to a
 * new value. Behaviour follows the React Bits Counter (per-place digit
 * columns, spring-driven, arbitrary places and decimals), rebuilt on GSAP and
 * the project tokens. Use it only where a number really changes; static
 * figures stay plain text.
 *
 * Assistive tech reads one visually-hidden text; the rolling digits are
 * `aria-hidden`. Under `prefers-reduced-motion` the value resolves instantly.
 * Place it inside a text style (`type-meta`, `font-display`); it inherits font
 * size, family and colour unless told otherwise.
 */
export function Counter({
  value,
  decimals,
  places,
  fontSize,
  padding = 0,
  gap = 0,
  borderRadius = 0,
  horizontalPadding = 0,
  textColor,
  tone = "inherit",
  fontWeight,
  surface = "default",
  gradientHeight = counter.gradientHeight,
  gradientFrom = `var(--color-surface-${surface})`,
  gradientTo = "transparent",
  label,
  className,
  containerStyle,
  counterStyle,
  digitStyle,
  topGradientStyle,
  bottomGradientStyle,
}: CounterProps) {
  const reduced = useRef(false);
  useGSAP(() => {
    const mm = withMotionPreference((r) => {
      reduced.current = r;
    });
    return () => mm.revert();
  });

  const finite = Number.isFinite(value);
  const negative = finite && value < 0;
  const abs = finite ? Math.abs(value) : 0;
  const text = decimals != null ? abs.toFixed(decimals) : plain(abs);
  // What the digits show, so units and text agree (2.999 at 2 decimals is 3.00).
  const shown = decimals != null ? Number(text) : abs;
  const layout = places ?? placesOf(text);
  const spoken =
    label ?? (finite ? `${negative ? "-" : ""}${text}` : "Not available");

  const fade = (
    edge: "top" | "bottom",
    extra?: CSSProperties,
  ): CSSProperties => ({
    height: toLength(gradientHeight),
    background: `linear-gradient(${edge === "top" ? "to bottom" : "to top"}, ${gradientFrom}, ${gradientTo})`,
    ...extra,
  });

  return (
    <span
      className={cn(
        "relative inline-flex align-bottom leading-none",
        toneClass[tone],
        className,
      )}
      style={{
        fontSize: fontSize != null ? toLength(fontSize) : undefined,
        color: textColor,
        fontWeight,
        ...containerStyle,
      }}
    >
      <span className="sr-only">{spoken}</span>
      <span
        aria-hidden="true"
        className="relative flex overflow-hidden leading-none tabular-nums"
        style={
          {
            "--counter-padding": toLength(padding),
            gap: toLength(gap),
            paddingInline: toLength(horizontalPadding),
            borderRadius: toLength(borderRadius),
            ...counterStyle,
          } as CSSProperties
        }
      >
        {!finite && <span>&mdash;</span>}
        {negative && (
          <span
            className="flex items-center justify-center"
            style={{ height: cellHeight }}
          >
            &minus;
          </span>
        )}
        {finite &&
          layout.map((place, i) =>
            place === "." ? (
              <span
                key={`point-${i}`}
                className="flex items-center justify-center"
                style={{ height: cellHeight }}
              >
                .
              </span>
            ) : (
              <Digit
                key={place}
                units={unitsAt(shown, place)}
                reduced={reduced}
                style={digitStyle}
              />
            ),
          )}
        <span
          className="pointer-events-none absolute inset-x-0 top-0"
          style={fade("top", topGradientStyle)}
        />
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={fade("bottom", bottomGradientStyle)}
        />
      </span>
    </span>
  );
}
