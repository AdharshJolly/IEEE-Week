import { EventRow } from "@/components/events/EventRow";
import { PixelReveal } from "@/components/motion/PixelReveal";
import { SignalTrail } from "@/components/motion/SignalLine";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Decor } from "@/components/ui/Decor";
import { Section } from "@/components/ui/Section";
import { SpecList } from "@/components/ui/SpecList";
import { pixel } from "@/lib/motion/tokens";
import { SectionIntro } from "./SectionIntro";

const language = [
  {
    word: "Signal",
    meaning: "movement, connection",
    cue: "Traces, rules that draw",
  },
  {
    word: "Grid",
    meaning: "engineering, structure",
    cue: "Hairlines, indices, alignment",
  },
  {
    word: "Pixel",
    meaning: "discovery, transformation",
    cue: "PixelReveal, only when information changes",
  },
  {
    word: "Border",
    meaning: "proximity, interaction",
    cue: "BorderGlow, one surface at a time",
  },
];

/** Editorial + technical primitives, shown with placeholder content. */
export function EditorialSection() {
  return (
    <Section
      id="editorial"
      tone="subtle"
      spacing="md"
      decor={<Decor variant="grid" className="inset-0" />}
    >
      <SectionIntro
        eyebrow="Visual language"
        title="Signal, grid, pixel, border."
      >
        Structure comes from type, whitespace and rules. Cards and shadows are
        the exception.
      </SectionIntro>

      <div className="mt-12 flex flex-col gap-16">
        <ul className="m-0 grid list-none gap-x-10 gap-y-6 p-0 md:grid-cols-2 lg:grid-cols-4">
          {language.map((item, i) => (
            <li
              key={item.word}
              className="border-line m-0 flex flex-col gap-2 border-t pt-4"
            >
              <span className="type-index text-content-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="type-h3">{item.word}</span>
              <span className="type-tech text-content-tertiary">
                {item.meaning}
              </span>
              <span className="type-body-sm text-content-secondary">
                {item.cue}
              </span>
            </li>
          ))}
        </ul>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">Type roles</h3>
            <p className="type-numeral">14</p>
            <p className="type-row-title">
              Row title that wraps at any length without clipping
            </p>
            <p className="type-index text-content-brand">01 / index</p>
            <p className="type-tech text-content-tertiary">Technical label</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">Metadata</h3>
            <SpecList
              items={[
                { label: "Date", value: "11 Nov" },
                { label: "Organised by", value: "Placeholder society" },
                { label: "Status", value: "Tentative" },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="type-tech text-content-tertiary">Event row</h3>
          <ul className="border-line m-0 list-none border-b p-0">
            <EventRow
              index={1}
              href="#editorial"
              title="Placeholder event title"
              day="11"
              month="Nov"
              dateLabel="11 Nov"
              societyShorts={["AAA", "BBB"]}
              societyNames={["Placeholder Society A", "Placeholder Society B"]}
              category="workshop"
              registrationState="open"
              tentative
            />
          </ul>
        </div>

        <div className="grid items-start gap-x-10 gap-y-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">
              PixelReveal (click or press Enter)
            </h3>
            <PixelReveal
              trigger="click"
              pattern={pixel.pattern.mark}
              className="min-h-40"
              firstContent={
                <div className="bg-surface-deep text-content-on-deep type-h3 flex h-full items-end p-6">
                  State one
                </div>
              }
              secondContent={
                <div className="bg-interactive-primary text-content-on-deep type-h3 flex h-full items-end p-6">
                  State two
                </div>
              }
            />
            <p className="type-body-sm text-content-secondary">
              Reduced motion swaps the state without pixels.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="type-tech text-content-tertiary">Signal + CTA</h3>
            <SignalTrail />
            <div>
              <SpecularButton href="#editorial" size="lg" arrow>
                Primary action
              </SpecularButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
