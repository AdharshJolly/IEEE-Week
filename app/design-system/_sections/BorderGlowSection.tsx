import { BorderGlow } from "@/components/effects/BorderGlow";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Section } from "@/components/ui/Section";
import { borderGlow } from "@/lib/motion/tokens";
import { SectionIntro } from "./SectionIntro";

const options = [
  {
    name: "surface",
    value: "default · subtle · elevated · deep",
    note: "Fill token. Light surfaces use a normal blend, deep uses a light-on-dark blend.",
  },
  {
    name: "tone",
    value: "cyan · blue · purple",
    note: "Glow hue from the brand palette. Defaults by surface.",
  },
  {
    name: "radius",
    value: "card · panel",
    note: "Matches the radius scale, so it fits Card and panel children.",
  },
  {
    name: "edgeSensitivity",
    value: `0 to 80 (${borderGlow.edgeSensitivity})`,
    note: "How close to an edge the pointer must be.",
  },
  {
    name: "coneSpread",
    value: `5 to 45 (${borderGlow.coneSpread})`,
    note: "Width of the lit arc around the pointer direction.",
  },
  {
    name: "glowRadius · glowIntensity",
    value: `px (${borderGlow.glowRadius}) · 0.1 to 3 (${borderGlow.glowIntensity})`,
    note: "How far and how strongly the outer glow reaches.",
  },
  {
    name: "colors",
    value: "three brand tokens",
    note: "Mesh border gradient. Never raw hex.",
  },
  {
    name: "animated",
    value: "boolean",
    note: "One intro sweep, the first time it scrolls into view.",
  },
];

const anatomy = [
  ["Surface", "Fill and 1px border from tokens. Always present."],
  [
    "Mesh border",
    "Brand-coloured border, masked to a cone toward the pointer.",
  ],
  ["Colour wash", "Faint inner tint near the edge, soft-light blended."],
  ["Edge light", "Outer glow line that extends past the surface."],
  ["Content", "Your children, above every layer. Untouched by the effect."],
];

const use = [
  "One featured or primary participation surface per view.",
  "A surface that is a single target: a featured card, a register panel.",
  "Where nearness to an edge is a useful cue that it can be acted on.",
];

const avoid = [
  "Lists of look-alike cards or rows, or every button.",
  "On the same element as PixelReveal, the cursor spotlight or magnetic offset.",
  "As the only sign of focus, selection, status or errors.",
  "Inside containers that clip overflow with no padding for the glow.",
];

/** BORDER primitive: documentation and live examples of BorderGlow. */
export function BorderGlowSection() {
  return (
    <Section id="border-glow" tone="default" spacing="md">
      <SectionIntro eyebrow="Border" title="Light that follows proximity.">
        BorderGlow lights the edge of a surface from the side the pointer is
        approaching. It signals that the surface can be acted on. It is the
        fourth primitive beside Signal, Grid and Pixel.
      </SectionIntro>

      <div className="mt-12 flex flex-col gap-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">
              Interactive: move toward an edge
            </h3>
            <BorderGlow surface="subtle" radius="card" animated>
              <div className="flex min-h-56 flex-col justify-between gap-6 p-6 sm:p-8">
                <p className="type-tech text-content-brand">Light surface</p>
                <div className="flex flex-col gap-3">
                  <p className="type-h3">Placeholder primary surface</p>
                  <p className="type-body-sm text-content-secondary">
                    Any content size works. The glow follows the edge.
                  </p>
                  <div>
                    <SpecularButton href="#border-glow" arrow>
                      Primary action
                    </SpecularButton>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">
              Deep surface, wide cone
            </h3>
            <BorderGlow
              surface="deep"
              radius="card"
              coneSpread={40}
              glowIntensity={1.2}
            >
              <div className="flex min-h-56 flex-col justify-between gap-6 p-6 sm:p-8">
                <p className="type-tech text-content-on-deep-accent">
                  Deep surface
                </p>
                <div className="flex flex-col gap-3">
                  <p className="type-h3 text-content-on-deep">
                    Same primitive, other surface
                  </p>
                  <p className="type-body-sm text-content-on-deep-secondary">
                    Use a deep surface for a rare contrast moment only.
                  </p>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">
              Key configuration
            </h3>
            <dl className="border-line m-0 border-b">
              {options.map((option) => (
                <div
                  key={option.name}
                  className="border-line grid gap-x-6 gap-y-1 border-t py-3 sm:grid-cols-[11rem_minmax(0,1fr)]"
                >
                  <dt className="type-meta text-content-brand">
                    {option.name}
                  </dt>
                  <dd className="m-0 flex flex-col gap-1">
                    <span className="type-meta text-content-primary">
                      {option.value}
                    </span>
                    <span className="type-body-sm text-content-secondary">
                      {option.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">Anatomy</h3>
            <ol className="border-line m-0 list-none border-b p-0">
              {anatomy.map(([name, text], i) => (
                <li
                  key={name}
                  className="border-line m-0 grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t py-3"
                >
                  <span className="type-index text-content-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="type-label">{name}</span>
                    <span className="type-body-sm text-content-secondary">
                      {text}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="type-tech text-content-tertiary">Use it for</h3>
            <ul className="type-body-sm text-content-secondary m-0 flex list-disc flex-col gap-2 pl-5">
              {use.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="type-tech text-content-tertiary">Do not use it</h3>
            <ul className="type-body-sm text-content-secondary m-0 flex list-disc flex-col gap-2 pl-5">
              {avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="type-tech text-content-tertiary">
              Accessibility and motion
            </h3>
            <ul className="type-body-sm text-content-secondary m-0 flex list-disc flex-col gap-2 pl-5">
              <li>
                Reduced motion: no glow and no sweep. The plain surface stays.
              </li>
              <li>
                Touch and coarse pointers: no glow. Nothing depends on hover.
              </li>
              <li>
                Decorative and <code>aria-hidden</code>. Keyboard focus keeps
                the standard focus ring on the interactive child.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="type-tech text-content-tertiary">
              With the other primitives
            </h3>
            <p className="type-body-sm text-content-secondary">
              Signal draws the path toward an action, Grid gives the surface its
              structure, Pixel reveals a changed state, and Border answers the
              pointer arriving. Give each element at most one of these effects.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
