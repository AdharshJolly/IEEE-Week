import { SocietyCard } from "@/components/events/SocietyCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "./SectionHeading";

export interface SocietiesSectionItem {
  id: string;
  /** Full name when officially known, otherwise the short code. */
  name: string;
  /** Short code for the mark tile; omitted when identical to `name`. */
  short?: string;
  logo?: string;
}

export interface SocietiesSectionProps {
  societies: SocietiesSectionItem[];
}

export function SocietiesSection({ societies }: SocietiesSectionProps) {
  return (
    <Section id="societies" spacing="md" aria-labelledby="societies-title">
      <div className="flex flex-col gap-12">
        <SectionHeading
          id="societies-title"
          eyebrow="Participating societies"
          title="Co-organised across IEEE."
        />
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {societies.map((society) => (
            <li key={society.id} className="reveal m-0 flex">
              <SocietyCard
                name={society.name}
                short={society.short}
                logo={society.logo}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
