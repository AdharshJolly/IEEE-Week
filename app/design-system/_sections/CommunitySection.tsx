import { SocietyCard } from "@/components/events/SocietyCard";
import { SpeakerCard } from "@/components/events/SpeakerCard";
import { Decor } from "@/components/ui/Decor";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { societies, speakers } from "../fixtures";
import { GroupLabel, SectionIntro } from "./SectionIntro";
import { BadgeCheck, CalendarCheck, Users } from "lucide-react";

export function CommunitySection() {
  return (
    <>
      <Section id="community" tone="default" spacing="md">
        <SectionIntro
          eyebrow="Community"
          title="Six societies, one student branch."
        >
          Society cards stay light and quiet so the logos and names do the
          talking.
        </SectionIntro>
        <ul className="m-0 mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {societies.map((s) => (
            <li key={s.name} className="reveal flex">
              <SocietyCard {...s} href="#community" className="w-full" />
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-x-8 gap-y-10 md:grid-cols-3">
          <FeatureCard
            icon={CalendarCheck}
            title="Plan the week in minutes"
            description="One schedule, filterable by society and format."
          />
          <FeatureCard
            icon={Users}
            title="Bring your team"
            description="Group registration for competitions and workshops."
          />
          <FeatureCard
            icon={BadgeCheck}
            variant="deep"
            title="IEEE members register first"
            description="Priority seats open 48 hours before everyone else."
          />
        </div>
      </Section>

      <Section
        tone="special"
        spacing="md"
        decor={
          <Decor
            variant="rings"
            at="0% 100%"
            className="bottom-0 left-0 h-[34rem] w-[34rem]"
          />
        }
      >
        <SectionIntro title="Hear from people who build things.">
          Portraits use the leaf crop with the focal point set to the face, so
          responsive crops never lose the speaker.
        </SectionIntro>
        <div className="mt-12">
          <GroupLabel>Speakers</GroupLabel>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-10 p-0 lg:grid-cols-4">
            {speakers.map((s, i) => (
              <li key={s.name} className={i % 2 ? "lg:mt-12" : undefined}>
                <SpeakerCard {...s} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
