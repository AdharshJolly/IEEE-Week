"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

/**
 * GLASS primitive: depth, layered interface, spatial separation.
 *
 * A TypeScript port of the React Bits `GlassSurface` (SVG displacement map +
 * per-channel `feDisplacementMap` fed to `backdrop-filter: url(#filter)`),
 * keeping its behaviour:
 *   - the displacement map is regenerated from the element's measured size on
 *     mount, on prop change and on every `ResizeObserver` tick, so the surface
 *     works at any dimensions;
 *   - engines that cannot run an SVG `backdrop-filter` (Safari, Firefox, and
 *     anything failing the feature test) get the `--fallback` surface, a plain
 *     blur + saturate layer, and a flat tint where `backdrop-filter` is absent.
 *
 * Differences from the demo: colour, border, radius and shadow come from the
 * IEEE Week tokens (see `.glass-surface` in `app/globals.css`); the corner
 * radius is read from the element's computed style so a `rounded-*` token
 * class drives both the CSS and the displacement map; defaults are tuned to
 * be subtle (no rainbow fringing); nothing animates.
 *
 * Use for the navbar and rare layered surfaces only. See `/design-system`.
 */

export interface GlassSurfaceProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children?: ReactNode;
  /** Edge band, as a fraction of the shorter side, where light bends. */
  borderWidth?: number;
  /** Lightness (%) of the map's neutral centre. 50 = no displacement. */
  brightness?: number;
  /** Opacity of the map's centre panel. */
  opacity?: number;
  /** Blur (px) of the map's centre panel: softens the edge transition. */
  blur?: number;
  /** Output blur (`stdDeviation`) applied after displacement. */
  displace?: number;
  /** Opacity (0-1) of the white frost laid over the backdrop. */
  frost?: number;
  /** Backdrop saturation factor. */
  saturation?: number;
  /** Main displacement scale. Negative bends the edge inward. */
  distortionScale?: number;
  /** Extra per-channel scale. Keep these within a few units of each other. */
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
}

type Channel = "R" | "G" | "B";
const X_CHANNEL: Channel = "R";
const Y_CHANNEL: Channel = "G";
const MIX_BLEND_MODE = "difference";

/** Subtle by default: a thin lensed edge, almost no channel separation. */
const defaults = {
  borderWidth: 0.07,
  brightness: 50,
  opacity: 0.93,
  blur: 11,
  displace: 0,
  frost: 0.72,
  saturation: 1.15,
  distortionScale: -48,
  redOffset: 0,
  greenOffset: 2,
  blueOffset: 4,
} as const;

function supportsSvgBackdropFilter() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  const ua = navigator.userAgent;
  const isWebkit = /Safari/.test(ua) && !/Chrome/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  if (isWebkit || isFirefox) return false;

  const probe = document.createElement("div");
  probe.style.backdropFilter = "url(#glass-feature-test)";
  return probe.style.backdropFilter !== "";
}

const subscribeNever = () => () => {};

export function GlassSurface({
  children,
  className,
  style,
  borderWidth = defaults.borderWidth,
  brightness = defaults.brightness,
  opacity = defaults.opacity,
  blur = defaults.blur,
  displace = defaults.displace,
  frost = defaults.frost,
  saturation = defaults.saturation,
  distortionScale = defaults.distortionScale,
  redOffset = defaults.redOffset,
  greenOffset = defaults.greenOffset,
  blueOffset = defaults.blueOffset,
  ...rest
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  // Server and first client render report `false` (fallback surface), then the
  // real answer applies without a hydration mismatch.
  const svgSupported = useSyncExternalStore(
    subscribeNever,
    supportsSvgBackdropFilter,
    () => false,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueRef = useRef<SVGFEDisplacementMapElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);

  const updateDisplacementMap = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width || 400;
    const height = rect.height || 200;
    const radius =
      parseFloat(getComputedStyle(container).borderTopLeftRadius) || 0;
    const edge = Math.min(width, height) * (borderWidth * 0.5);

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${MIX_BLEND_MODE}" />
        <rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    feImageRef.current?.setAttribute(
      "href",
      `data:image/svg+xml,${encodeURIComponent(svg)}`,
    );
  }, [borderWidth, brightness, opacity, blur, redGradId, blueGradId]);

  // Filter parameters and a fresh map whenever a prop changes.
  useEffect(() => {
    const frame = requestAnimationFrame(updateDisplacementMap);

    (
      [
        [redRef, redOffset],
        [greenRef, greenOffset],
        [blueRef, blueOffset],
      ] as const
    ).forEach(([ref, offset]) => {
      ref.current?.setAttribute("scale", String(distortionScale + offset));
      ref.current?.setAttribute("xChannelSelector", X_CHANNEL);
      ref.current?.setAttribute("yChannelSelector", Y_CHANNEL);
    });
    blurRef.current?.setAttribute("stdDeviation", String(displace));

    return () => cancelAnimationFrame(frame);
  }, [
    updateDisplacementMap,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    displace,
  ]);

  // Regenerate on any size change (viewport, content wrap, menu, font load).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateDisplacementMap);
    });
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [updateDisplacementMap]);

  const surfaceStyle = {
    ...style,
    "--glass-frost": frost,
    "--glass-saturation": saturation,
    "--glass-filter": `url(#${filterId})`,
  } as CSSProperties;

  return (
    <div
      {...rest}
      ref={containerRef}
      className={cn(
        "glass-surface",
        svgSupported ? "glass-surface--svg" : "glass-surface--fallback",
        className,
      )}
      style={surfaceStyle}
    >
      <svg
        className="glass-surface__filter"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              ref={feImageRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />

            <feDisplacementMap
              ref={redRef}
              in="SourceGraphic"
              in2="map"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenRef}
              in="SourceGraphic"
              in2="map"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap
              ref={blueRef}
              in="SourceGraphic"
              in2="map"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={blurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
