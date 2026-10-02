import { SpecularButton } from "@/components/ui/SpecularButton";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";
import { SERIES_NAME } from "@/lib/site/config";

export interface AboutSectionProps {
  statement: string;
  detail?: string;
  organization: string;
}

export function AboutSection({
  statement,
  detail,
  organization,
}: AboutSectionProps) {
  return (
    <Section
      id="about"
      tone="deep"
      spacing="lg"
      aria-labelledby="about-title"
      className="overflow-hidden"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6 lg:order-2">
          <Eyebrow onDeep>About {SERIES_NAME}</Eyebrow>
          <Heading as="h2" id="about-title" visualStyle="h1" tone="deep">
            {statement}
          </Heading>
          {detail && (
            <Text visualStyle="body-lg" tone="on-deep-secondary">
              {detail}
            </Text>
          )}
          <Text visualStyle="label" tone="on-deep-secondary" className="mt-4">
            Presented by {organization}
          </Text>
          <div className="mt-2">
            <SpecularButton href="/about" variant="secondary">
              Learn more about us
            </SpecularButton>
          </div>
        </div>

        <div className="relative isolate lg:order-1">
          <Decor
            variant="rings-on-deep"
            at="50% 50%"
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[150%] w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2"
          />
          <Photo
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
            alt="Students collaborating"
            aspect="4/5"
            shape="leaf"
            tone="cyan"
            treatment="brand"
            className="shadow-float relative z-10 mx-auto w-full max-w-sm"
          />
        </div>
      </div>
    </Section>
  );
}
