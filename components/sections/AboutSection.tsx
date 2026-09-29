import { Button } from "@/components/ui/Button";
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
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="flex flex-col gap-6 lg:order-2">
          <Eyebrow onDeep>About {SERIES_NAME}</Eyebrow>
          <Heading as="h2" id="about-title" visualStyle="h1" tone="deep">
            {statement}
          </Heading>
          {detail && (
            <Text
              visualStyle="body-lg"
              tone="on-deep-secondary"
            >
              {detail}
            </Text>
          )}
          <Text visualStyle="label" tone="on-deep-secondary" className="mt-4">
            Presented by {organization}
          </Text>
          <div className="mt-2">
            <Button href="/about" variant="primary">
              Learn more about us
            </Button>
          </div>
        </div>
        
        <div className="lg:order-1 relative isolate">
          <Decor
            variant="rings-on-deep"
            at="50% 50%"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[150%] w-[150%] max-w-none pointer-events-none -z-10"
          />
          <Photo 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
            alt="Students collaborating"
            aspect="4/5" 
            shape="leaf" 
            tone="cyan"
            treatment="brand"
            className="relative z-10 w-full max-w-sm mx-auto shadow-float" 
          />
        </div>
      </div>
    </Section>
  );
}
