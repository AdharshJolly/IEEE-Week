"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { IconButton } from "./IconButton";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Action row, right-aligned. Put the primary action last. */
  footer?: ReactNode;
}

/**
 * Native `<dialog>` opened with showModal(): the browser supplies the focus
 * trap, inert background, top layer and Escape handling, so none of it can
 * regress. Focus returns to the trigger on close automatically.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) onClose();
      }}
      className="rounded-panel bg-surface-elevated text-content-primary shadow-float backdrop:bg-surface-overlay m-auto w-[min(92vw,34rem)] border-0 p-0 open:animate-[toast-in_var(--duration-slow)_var(--ease-emphasis)_both]"
    >
      <div className="flex flex-col gap-2 p-6 pb-2 sm:p-8 sm:pb-3">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="type-h3">
            {title}
          </h2>
          <IconButton
            aria-label="Close dialog"
            variant="ghost"
            size="sm"
            className="-mt-1 -mr-2"
            onClick={onClose}
          >
            <X className="size-5" aria-hidden="true" />
          </IconButton>
        </div>
        {description && (
          <p id={descId} className="type-body text-content-secondary">
            {description}
          </p>
        )}
      </div>
      {children && <div className="px-6 py-3 sm:px-8">{children}</div>}
      {footer && (
        <div className="flex flex-wrap justify-end gap-3 p-6 pt-4 sm:p-8 sm:pt-4">
          {footer}
        </div>
      )}
    </dialog>
  );
}
