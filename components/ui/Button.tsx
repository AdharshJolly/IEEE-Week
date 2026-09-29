import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  type AnchorHTMLAttributes,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Use on navy (`deep`) surfaces. */
  onDeep?: boolean;
  /** Nested trailing arrow well: the signature IEEE Week CTA. */
  arrow?: boolean;
}

const baseStyles =
  "group/btn relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-control border " +
  "font-body font-semibold tracking-[-0.005em] transition-[background-color,color,border-color,transform,box-shadow] " +
  "duration-base ease-emphasis active:translate-y-px active:scale-[0.985] " +
  "disabled:pointer-events-none disabled:not-aria-busy:border-transparent disabled:not-aria-busy:bg-interactive-disabled " +
  "disabled:not-aria-busy:text-interactive-disabled-content disabled:not-aria-busy:shadow-none aria-busy:pointer-events-none aria-busy:cursor-progress";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-interactive-primary text-content-on-brand shadow-rest hover:bg-interactive-primary-hover hover:shadow-raised active:bg-interactive-primary-active",
  secondary:
    "border-transparent bg-interactive-secondary text-content-on-deep shadow-rest hover:bg-interactive-secondary-hover hover:shadow-raised",
  accent:
    "border-transparent bg-brand-cyan text-content-on-accent hover:bg-surface-default hover:shadow-raised",
  outline:
    "border-line-control bg-transparent text-content-primary hover:border-interactive-primary hover:bg-interactive-subtle-hover hover:text-content-brand",
  ghost:
    "border-transparent bg-transparent text-content-brand hover:bg-interactive-subtle-hover",
  destructive:
    "border-transparent bg-status-error text-content-on-brand hover:bg-status-error-hover",
};

// Overrides on navy surfaces.
const onDeepStyles: Partial<Record<ButtonVariant, string>> = {
  primary:
    "border-transparent bg-brand-cyan text-content-on-accent hover:bg-surface-default active:bg-surface-brand",
  secondary:
    "border-transparent bg-surface-default text-content-primary hover:bg-surface-brand",
  outline:
    "border-line-on-deep text-content-on-deep hover:border-content-on-deep hover:bg-content-on-deep/10 hover:text-content-on-deep",
  ghost:
    "border-transparent bg-transparent text-content-on-deep hover:bg-content-on-deep/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-[0.875rem]",
  md: "h-12 gap-2.5 px-6 text-[1rem]",
  lg: "h-14 gap-3 px-7 text-[1.0625rem]",
};

// With the nested arrow well the right padding collapses so the well sits
// flush inside the button with a concentric inset.
const arrowPadding: Record<ButtonSize, string> = {
  sm: "pr-1.5",
  md: "pr-1.5",
  lg: "pr-2",
};

const wellSize: Record<ButtonSize, string> = {
  sm: "size-7",
  md: "size-9",
  lg: "size-10",
};

/** Class names shared by Button, IconButton and any link styled as a button. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  onDeep = false,
  arrow = false,
}: ButtonStyleOptions = {}): string {
  return cn(
    baseStyles,
    // On navy, a variant's override replaces (never stacks on) its default.
    (onDeep && onDeepStyles[variant]) || variantStyles[variant],
    sizeStyles[size],
    arrow && arrowPadding[size],
    fullWidth && "w-full",
  );
}

interface ButtonOwnProps extends ButtonStyleOptions {
  /** Shows a spinner, disables interaction and sets `aria-busy`. */
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentPropsWithRef<"button">, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Spinner() {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="size-4.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
    </span>
  );
}

/** Renders a `<button>`, or a Next `<Link>` when `href` is provided. */
export function Button(props: ButtonProps) {
  const {
    variant,
    size = "md",
    fullWidth,
    onDeep,
    arrow,
    loading = false,
    className,
    children,
    ...rest
  } = props;
  const classes = cn(
    buttonStyles({ variant, size, fullWidth, onDeep, arrow }),
    className,
  );
  const content = (
    <>
      <span
        className={cn(
          "inline-flex items-center gap-[inherit]",
          loading && "invisible",
        )}
      >
        {children}
        {arrow && (
          <span
            className={cn(
              "ml-1 flex items-center justify-center rounded-[calc(var(--radius-control)-6px)] bg-current/12",
              "duration-base ease-emphasis transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px group-hover/btn:scale-105",
              wellSize[size],
            )}
            aria-hidden="true"
          >
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </span>
        )}
      </span>
      {loading && <Spinner />}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
    return (
      <Link
        href={href}
        className={classes}
        aria-busy={loading || undefined}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const {
    disabled,
    type = "button",
    ...buttonProps
  } = rest as ComponentPropsWithRef<"button">;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
