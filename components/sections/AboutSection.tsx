import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";

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
      spacing="md"
      aria-labelledby="about-title"
      decor={
        <Decor
          variant="rings-on-deep"
          at="100% 100%"
          className="right-0 bottom-0 h-[36rem] w-[36rem]"
        />
      }
    >
      <div className="flex max-w-4xl flex-col gap-8">
        <Eyebrow onDeep>About IEEE Week</Eyebrow>
        <Heading as="h2" id="about-title" visualStyle="hero" tone="deep">
          {statement}
        </Heading>
        {detail && (
          <Text
            visualStyle="body-lg"
            tone="on-deep-secondary"
            className="max-w-2xl"
          >
            {detail}
          </Text>
        )}
        <Text visualStyle="label" tone="on-deep-secondary">
          Presented by {organization}
        </Text>
      </div>
    </Section>
  );
}
