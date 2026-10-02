import { GlassSurface } from "@/components/effects/GlassSurface";
import { Section } from "@/components/ui/Section";
import { SERIES_NAME } from "@/lib/site/config";
import { SectionIntro } from "./SectionIntro";

const anatomy = [
  ["Frost", "Token surface colour at partial opacity over the backdrop."],
  [
    "Lensed edge",
    "SVG displacement map bends the backdrop in a thin band at the border.",
  ],
  ["Hairline", "1px line token plus a top highlight. Keeps the shape crisp."],
  ["Elevation", "The raised shadow token. No custom glow."],
  ["Content", "Your children, above every layer. Never filtered."],
];

const behaviour = [
  "Resize aware: the map is rebuilt from the measured size, so any width, height or wrapped text works.",
  "Safari, Firefox and engines without SVG backdrop filters get a plain blur and saturate layer; with no backdrop-filter at all the surface is near opaque.",
  "prefers-reduced-transparency gives a solid surface. Nothing in GlassSurface animates, so reduced motion needs no special case.",
  "Pointer events and focus pass straight through to children. Give it tabIndex and it shows the standard focus ring.",
];

const use = [
  "Preferred: the navbar and other layered interface that sits over scrolling content.",
  "Limited: a selected structural surface, such as a sticky filter bar.",
];

const avoid = [
  "Every card, every button, every section.",
  "On the same element as BorderGlow, PixelReveal, a cursor spotlight or magnetic offset.",
  "Over a flat, empty background: with nothing behind it, glass has nothing to show.",
  "Stronger distortion or channel offsets. The edge should read as depth, not as a rainbow.",
];

/** GLASS primitive: the navbar is the canonical example. */
export function GlassSection() {
  return (
    <Section id="glass" tone="subtle" spacing="md">
      <SectionIntro eyebrow="Glass" title="Depth for the layer on top.">
        GlassSurface separates a layer of interface from the content moving
        beneath it. It is a surface treatment, not the identity of the site. The
        navbar is its canonical use, paired with Grid for structure.
      </SectionIntro>

      <div className="mt-12 flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h3 className="type-tech text-content-tertiary">
            Canonical example: the navbar
          </h3>
          <div
            aria-hidden="true"
            className="border-line rounded-card relative overflow-hidden border px-4 py-8 sm:px-8"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
              backgroundSize: "2rem 2rem",
            }}
          >
            <div className="bg-brand-blue absolute top-0 left-[18%] h-full w-24 opacity-20" />
            <div className="bg-brand-cyan absolute top-0 left-[55%] h-full w-16 opacity-30" />
            <GlassSurface className="rounded-control relative">
              <div className="flex min-h-14 items-center gap-4 px-4 py-1.5">
                <span className="font-display text-content-primary min-w-0 text-[1.125rem] font-bold tracking-[-0.03em] [overflow-wrap:anywhere]">
                  {SERIES_NAME}
                </span>
                <span className="bg-line my-2 w-px self-stretch" />
                <span className="type-tech text-content-brand">Events</span>
                <span className="type-tech text-content-secondary max-sm:hidden">
                  About
                </span>
                <span className="type-tech text-content-secondary max-sm:hidden">
                  Contact
                </span>
              </div>
            </GlassSurface>
          </div>
          <p className="type-body-sm text-content-secondary max-w-2xl">
            Static illustration. The live version is the bar at the top of this
            page. Hues behind it are visible through the frost and bend slightly
            at the edge.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">
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

          <div className="flex flex-col gap-3">
            <h3 className="type-tech text-content-tertiary">
              Behaviour and fallbacks
            </h3>
            <ul className="type-body-sm text-content-secondary m-0 flex list-disc flex-col gap-2 pl-5">
              {behaviour.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
      </div>
    </Section>
  );
}
