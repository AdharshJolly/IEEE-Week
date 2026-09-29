import { Section } from "@/components/ui/Section";
import { typeRoles } from "../fixtures";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const clusters = [
  { title: "Headlines", roles: ["Display", "Hero", "H1", "H2", "H3", "Title"] },
  { title: "Reading", roles: ["Body large", "Body", "Body small"] },
  { title: "Interface", roles: ["Label", "Eyebrow", "Caption", "Metadata"] },
];

const principles = [
  "Headlines tighten as they grow: tracking runs from -0.04em at display size to -0.012em at title size.",
  "Emphasis is a colour shift inside the same family and weight, never a second typeface.",
  "Body copy holds a 65 character measure and never drops below 16px, except small text at 14px.",
  "Times, counts and codes use tabular mono so schedules align.",
];

export function TypographySection() {
  return (
    <Section tone="default" spacing="md">
      <SectionIntro title="Type with a point of view.">
        A confident grotesque for headlines, a neutral humanist sans for
        reading, and a mono for facts.
      </SectionIntro>

      <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="rounded-panel bg-surface-subtle relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-8 sm:p-10 lg:col-span-7">
          <p
            aria-hidden="true"
            className="font-display text-content-brand text-[clamp(8rem,5rem+14vw,16rem)] leading-[0.8] font-bold tracking-[-0.06em]"
          >
            Aa
          </p>
          <div className="relative mt-10 flex flex-col gap-1">
            <p className="type-h3">Bricolage Grotesque</p>
            <p className="type-body-sm text-content-secondary">
              Display and headings. Loaded with next/font, no external requests.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <div className="flex flex-col gap-6">
            <div>
              <p className="type-h3">Geist</p>
              <p className="type-body text-content-secondary">
                Body, labels and captions. Clean at 14 to 20px.
              </p>
            </div>
            <div>
              <p className="type-h3 font-mono">Geist Mono</p>
              <p className="type-body text-content-secondary">
                Metadata: 10:00 to 13:00, 24 seats, Block C.
              </p>
            </div>
          </div>
          <ul className="border-line m-0 flex list-none flex-col gap-3 border-t p-0 pt-6">
            {principles.map((p) => (
              <li key={p} className="type-body-sm text-content-secondary">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-16">
        {clusters.map((cluster) => (
          <div key={cluster.title}>
            <GroupLabel>{cluster.title}</GroupLabel>
            <div className="flex flex-col gap-9">
              {cluster.roles.map((name) => {
                const role = typeRoles.find((r) => r.role === name)!;
                return (
                  <div
                    key={role.role}
                    className="grid gap-x-10 gap-y-2 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-baseline"
                  >
                    <div>
                      <p className="type-label">{role.role}</p>
                      <p className="type-meta text-content-tertiary">
                        {role.style}
                      </p>
                      <p className="type-meta text-content-tertiary">
                        {role.spec}
                      </p>
                    </div>
                    <p className={`${role.cls} text-content-primary max-w-4xl`}>
                      {role.sample}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
