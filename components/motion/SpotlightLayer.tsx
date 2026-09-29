"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following highlight for the parent element. Renders one decorative
 * overlay and writes `--mx/--my` (px) and `--tx/--ty` (-1..1, from centre) on
 * the parent; the highlight and `.magnetic` children read them in CSS.
 *
 * Mouse-only: touch/pen pointers and `prefers-reduced-motion` are ignored, so
 * no listeners do work there. Never intercepts clicks (pointer-events: none).
 * The parent needs `position: relative`.
 */
export function SpotlightLayer() {
  const layer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = layer.current?.parentElement;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduce.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = host.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        host.style.setProperty("--mx", `${x}px`);
        host.style.setProperty("--my", `${y}px`);
        host.style.setProperty("--tx", String((x / rect.width - 0.5) * 2));
        host.style.setProperty("--ty", String((y / rect.height - 0.5) * 2));
        host.dataset.spotlight = "on";
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      host.dataset.spotlight = "off";
      host.style.setProperty("--tx", "0");
      host.style.setProperty("--ty", "0");
    };

    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <span ref={layer} aria-hidden="true" className="spotlight-layer" />;
}
