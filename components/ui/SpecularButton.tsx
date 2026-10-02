"use client";

import Link from "next/link";
import {
  type AnchorHTMLAttributes,
  type ComponentPropsWithRef,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { attachSpecular } from "@/lib/motion/specular";
import { specular } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import {
  ButtonContent,
  type ButtonSize,
  buttonStyles,
  type ButtonVariant,
} from "./Button";

/*
 * SPECULAR primitive: the project's canonical action button.
 *
 * Hierarchy (see DESIGN.md "Buttons"):
 * - primary:   filled, full specular highlight. Register, Explore Events.
 * - secondary: outlined, restrained highlight.
 * - tertiary / ghost: quiet text button, no WebGL, no highlight.
 *
 * The highlight is an enhancement only: the button is a normal `<button>` (or
 * a Next `<Link>` with `href`) and is fully styled and usable without it. It
 * is off for tertiary/ghost, disabled buttons, touch/coarse pointers and
 * reduced motion. Never combine with BorderGlow, PixelReveal or other
 * button-level effects.
 */

export type SpecularVariant = "primary" | "secondary" | "tertiary" | "ghost";

const styleVariant: Record<SpecularVariant, ButtonVariant> = {
  primary: "primary",
  secondary: "outline",
  tertiary: "ghost",
  ghost: "ghost",
};

const canRunEffect =
  "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

interface SpecularOwnProps {
  variant?: SpecularVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Use on navy (`deep`) surfaces. */
  onDeep?: boolean;
  /** Nested trailing arrow well. */
  arrow?: boolean;
  children?: ReactNode;
  className?: string;
}

type SpecularAsButton = SpecularOwnProps &
  Omit<ComponentPropsWithRef<"button">, keyof SpecularOwnProps | "ref"> & {
    href?: undefined;
  };

type SpecularAsLink = SpecularOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SpecularOwnProps> & {
    href: string;
  };

export type SpecularButtonProps = SpecularAsButton | SpecularAsLink;

export function SpecularButton(props: SpecularButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    onDeep,
    arrow,
    className,
    children,
    ...rest
  } = props;

  const ref = useRef<HTMLElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);

  const preset =
    variant === "primary" || variant === "secondary" ? variant : null;
  const disabled = props.href === undefined && Boolean(props.disabled);

  useEffect(() => {
    const button = ref.current;
    const fx = fxRef.current;
    if (!preset || disabled || !button || !fx) return;

    const mq = window.matchMedia(canRunEffect);
    let detach: (() => void) | undefined;
    const sync = () => {
      detach?.();
      detach = mq.matches ? attachSpecular({ button, fx, preset }) : undefined;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      detach?.();
    };
  }, [preset, disabled]);

  const classes = cn(
    buttonStyles({
      variant: styleVariant[variant],
      size,
      fullWidth,
      onDeep,
      arrow,
      fluid: true,
    }),
    className,
  );
  const dataProps = {
    "data-specular": preset ?? undefined,
    "data-on-deep": onDeep ? "" : undefined,
  };
  const content = (
    <>
      {preset && (
        <span
          ref={fxRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-0"
          style={{ inset: -specular[preset].bleed }}
        />
      )}
      <span className="relative z-10 inline-flex">
        <ButtonContent arrow={arrow} size={size}>
          {children}
        </ButtonContent>
      </span>
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...dataProps}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } =
    rest as ComponentPropsWithRef<"button">;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      {...dataProps}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
