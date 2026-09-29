import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegistrationState } from "@/types/event";

const copy: Record<RegistrationState, string> = {
  open: "Registration open",
  limited: "Few seats left",
  closed: "Registration closed",
  soon: "Opens soon",
  registered: "You’re registered",
};

const styles: Record<RegistrationState, string> = {
  open: "bg-status-success-surface text-status-success",
  limited: "bg-status-warning-surface text-status-warning",
  closed: "bg-surface-muted text-content-secondary",
  soon: "bg-status-info-surface text-status-info",
  registered: "bg-surface-deep text-content-on-deep",
};

// Plain (no background) variant keeps the same hue, on white.
const plainStyles: Record<RegistrationState, string> = {
  open: "text-status-success",
  limited: "text-status-warning",
  closed: "text-content-secondary",
  soon: "text-status-info",
  registered: "text-content-primary",
};

export interface RegistrationStatusProps {
  status: RegistrationState;
  /** With `status="limited"`, renders "N seats left". */
  seatsLeft?: number;
  /** Text only, no tinted background. */
  plain?: boolean;
  /** Override the default copy. */
  label?: string;
  className?: string;
}

/** State is always carried by text as well as color. */
export function RegistrationStatus({
  status,
  seatsLeft,
  plain = false,
  label,
  className,
}: RegistrationStatusProps) {
  const text =
    label ??
    (status === "limited" && seatsLeft !== undefined
      ? `${seatsLeft} seats left`
      : copy[status]);
  return (
    <span
      className={cn(
        "type-label inline-flex items-center gap-2 whitespace-nowrap",
        plain ? plainStyles[status] : "rounded-tag h-8 pr-3 pl-2.5",
        !plain && styles[status],
        className,
      )}
    >
      {status === "registered" ? (
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      ) : (
        <span
          className="size-2 rounded-full bg-current ring-4 ring-current/15"
          aria-hidden="true"
        />
      )}
      {text}
    </span>
  );
}
