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
  description?: string;
}

export interface SocietiesSectionProps {
  societies: SocietiesSectionItem[];
  layout?: "grid" | "list";
}

export function SocietiesSection({ societies, layout = "grid" }: SocietiesSectionProps) {
  const isList = layout === "list";
  
  return (
    <Section id="societies" spacing="md" aria-labelledby="societies-title">
      <div className="flex flex-col gap-12">
        <SectionHeading
          id="societies-title"
          eyebrow="Participating societies"
          title="Co-organised across IEEE."
        />
        <ul
          className={
            isList
              ? "m-0 flex list-none flex-col gap-6 p-0"
              : "m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {societies.map((society) => (
            <li key={society.id} className="reveal m-0 flex">
              <SocietyCard
                name={society.name}
                short={society.short}
                logo={society.logo}
                description={society.description}
                layout={isList ? "horizontal" : "vertical"}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
