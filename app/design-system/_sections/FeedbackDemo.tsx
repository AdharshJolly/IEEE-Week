"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";

/** Client island: opens the native-dialog Modal and toggles a Toast. */
export function FeedbackDemo() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Button variant="outline" onClick={() => setToast((v) => !v)}>
          {toast ? "Hide toast" : "Show toast"}
        </Button>
      </div>

      <div aria-live="polite" className="min-h-[5.5rem] w-full">
        {toast && (
          <Toast
            variant="success"
            title="Seat reserved"
            description="A confirmation is on its way to your inbox."
            action={
              <Button
                size="sm"
                variant="ghost"
                onDeep
                onClick={() => setToast(false)}
              >
                Dismiss
              </Button>
            }
          />
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Cancel your registration?"
        description="Your seat goes back to the waitlist. You can register again while seats remain."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Keep my seat
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Cancel registration
            </Button>
          </>
        }
      />
    </div>
  );
}
