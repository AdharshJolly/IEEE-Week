import Image from "next/image";
import { Reveal, RuleDraw } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { stagger } from "@/lib/motion/tokens";
import { SectionHeading } from "./SectionHeading";

export interface SocietiesSectionItem {
  id: string;
  /** Full name when officially known, otherwise the short code. */
  name: string;
  /** Short code; omitted when identical to `name`. */
  short?: string;
  logo?: string;
  description?: string;
}

export interface SocietiesSectionProps {
  societies: SocietiesSectionItem[];
}

/**
 * Indexed rail: number, mark, name, description, separated by drawn rules.
 * Only supplied society data is shown. No PixelReveal here on purpose:
 * pixel transitions are reserved for moments that reveal real information,
 * and a long list of look-alike rows would only add noise.
 */
export function SocietiesSection({ societies }: SocietiesSectionProps) {
  return (
    <Section id="societies" spacing="md" aria-labelledby="societies-title">
      <div className="flex flex-col gap-12">
        <SectionHeading
          id="societies-title"
          eyebrow="Participating societies"
          title="Co-organised across IEEE."
        />
        <ol className="m-0 flex list-none flex-col p-0">
          {societies.map((society, index) => (
            <Reveal
              as="li"
              key={society.id}
              direction="left"
              delay={Math.min(index, 3) * stagger.base}
              className="m-0 flex flex-col gap-6 pb-8"
            >
              <RuleDraw className="bg-line h-px w-full" />
              <div className="grid items-start gap-x-8 gap-y-4 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)] lg:grid-cols-[4rem_5rem_minmax(0,1fr)_minmax(0,1.4fr)]">
                <span
                  aria-hidden="true"
                  className="type-index text-content-brand md:pt-2"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative hidden size-14 lg:block">
                  {society.logo && (
                    <Image
                      src={society.logo}
                      alt=""
                      fill
                      unoptimized
                      sizes="3.5rem"
                      className="object-contain object-left brightness-0"
                    />
                  )}
                </span>
                <div className="flex min-w-0 flex-col gap-2">
                  {society.short && society.short !== society.name && (
                    <p className="type-tech text-content-tertiary">
                      {society.short}
                    </p>
                  )}
                  <h3 className="type-h3 text-balance">{society.name}</h3>
                </div>
                {society.description && (
                  <p className="type-body-sm text-content-secondary max-w-prose md:col-start-3 lg:col-start-4">
                    {society.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
