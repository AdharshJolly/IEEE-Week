import { Check, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { specular } from "@/lib/motion/tokens";
import { SERIES_NAME } from "@/lib/site/config";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const use = [
  "Primary: the one meaningful action in a view (Register, Explore Events, View Event).",
  "Secondary: the supporting action beside a primary (Back to events, Learn more).",
  "Stand-alone CTAs with room around them for the light to read.",
];

const avoid = [
  "Utility and low-priority actions: toolbar buttons, filters, Add to calendar, close, form chrome. Use Button, IconButton or tertiary.",
  "More than one primary per view, or repeated in lists of look-alike items.",
  "On the same element as BorderGlow, PixelReveal, spotlight or magnetic effects.",
  "As the only cue of hover, focus or state. The fill, outline and focus ring carry meaning.",
];

/*
 * Forced states: these classes reproduce what the real :hover / :active /
 * :focus-visible rules apply, so every state can be shown at once.
 */
const forced = {
  primary: {
    hover: "bg-interactive-primary-hover shadow-raised",
    active: "bg-interactive-primary-active translate-y-px scale-[0.985]",
  },
  secondary: {
    hover:
      "border-interactive-primary bg-interactive-subtle-hover text-content-brand",
    active:
      "border-interactive-primary bg-interactive-subtle-hover text-content-brand translate-y-px scale-[0.985]",
  },
  tertiary: {
    hover: "bg-interactive-subtle-hover",
    active: "bg-interactive-subtle-hover translate-y-px scale-[0.985]",
  },
} as const;
const focusRing = "outline-interactive-focus outline-2 outline-offset-3";

const variants = ["primary", "secondary", "tertiary"] as const;
const sizes = ["sm", "md", "lg"] as const;

const hierarchy = [
  {
    name: "primary",
    treatment: `Specular · intensity ${specular.primary.intensity}, reacts within ${specular.primary.proximity}px`,
  },
  {
    name: "secondary",
    treatment: `Specular, restrained · intensity ${specular.secondary.intensity}, reacts within ${specular.secondary.proximity}px`,
  },
  {
    name: "tertiary / ghost",
    treatment: "None. Plain lightweight button or link, no WebGL",
  },
];

/** SPECULAR primitive: the button hierarchy and its states. */
export function ButtonsSection() {
  return (
    <Section id="buttons" tone="default" spacing="md">
      <SectionIntro eyebrow="Specular" title="Light that marks the action.">
        SpecularButton is the canonical action button for {SERIES_NAME}. The
        highlight follows the pointer and fades in with proximity. It never
        loops on its own, and the button works the same without it.
      </SectionIntro>

      <div className="mt-12 flex flex-col gap-16">
        <div>
          <GroupLabel>Hierarchy (move the pointer near each button)</GroupLabel>
          <dl className="border-line m-0 border-b">
            {hierarchy.map((h) => (
              <div
                key={h.name}
                className="border-line grid gap-1 border-t py-3 sm:grid-cols-[12rem_1fr]"
              >
                <dt className="type-tech text-content-brand">{h.name}</dt>
                <dd className="type-body-sm text-content-secondary m-0">
                  {h.treatment}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <GroupLabel>Variants and sizes</GroupLabel>
          <div className="flex flex-col gap-6">
            {variants.map((variant) => (
              <div
                key={variant}
                className="flex flex-wrap items-center gap-x-4 gap-y-3"
              >
                {sizes.map((size) => (
                  <SpecularButton
                    key={size}
                    variant={variant}
                    size={size}
                    arrow={variant === "primary" && size !== "sm"}
                  >
                    {variant} · {size}
                  </SpecularButton>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <GroupLabel>States</GroupLabel>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {(["default", "hover", "focus", "active", "disabled"] as const).map(
              (state) => (
                <div key={state} className="flex flex-col items-start gap-4">
                  <p className="type-tech text-content-tertiary">{state}</p>
                  {variants.map((variant) => (
                    <SpecularButton
                      key={variant}
                      variant={variant}
                      disabled={state === "disabled"}
                      className={
                        state === "hover"
                          ? forced[variant].hover
                          : state === "active"
                            ? forced[variant].active
                            : state === "focus"
                              ? focusRing
                              : undefined
                      }
                    >
                      {variant}
                    </SpecularButton>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>

        <div>
          <GroupLabel>Natural sizing and full width</GroupLabel>
          <div className="flex max-w-sm flex-col gap-4">
            <SpecularButton size="lg" fullWidth arrow>
              Register for the opening keynote and all three workshop days
            </SpecularButton>
            <SpecularButton variant="secondary" fullWidth>
              Go
            </SpecularButton>
          </div>
        </div>

        <div
          className="bg-surface-deep text-content-on-deep rounded-panel p-6 sm:p-8"
          data-surface="deep"
        >
          <GroupLabel>On deep surfaces</GroupLabel>
          <div className="flex flex-wrap items-center gap-4">
            <SpecularButton onDeep size="lg" arrow>
              Register now
            </SpecularButton>
            <SpecularButton onDeep variant="secondary" size="lg">
              View schedule
            </SpecularButton>
            <SpecularButton onDeep variant="tertiary" size="lg">
              Learn more
            </SpecularButton>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li>
              <GroupLabel>Use the specular treatment</GroupLabel>
            </li>
            {use.map((item) => (
              <li
                key={item}
                className="type-body-sm text-content-secondary flex gap-3"
              >
                <Check
                  className="text-status-success mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li>
              <GroupLabel>Do not use it</GroupLabel>
            </li>
            {avoid.map((item) => (
              <li
                key={item}
                className="type-body-sm text-content-secondary flex gap-3"
              >
                <X
                  className="text-status-error mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
