import { Reveal } from "@/components/motion/Reveal";
import { SignalTrail } from "@/components/motion/SignalLine";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export interface EventRegistrationCtaProps {
  eventTitle: string;
  /** External registration link. Absent until registration is announced. */
  registrationUrl?: string;
}

export function EventRegistrationCta({
  eventTitle,
  registrationUrl,
}: EventRegistrationCtaProps) {
  return (
    <Section
      tone="brand"
      spacing="md"
      aria-labelledby="registration-title"
      decor={
        <Decor
          variant="rings"
          at="0% 100%"
          className="bottom-0 left-0 h-[32rem] w-[32rem]"
        />
      }
    >
      <Reveal className="flex flex-col items-start gap-6 lg:max-w-2xl">
        <Heading as="h2" id="registration-title" visualStyle="h1">
          Registration
        </Heading>
        {registrationUrl ? (
          <>
            <Text visualStyle="body-lg" tone="secondary">
              Register for {eventTitle}.
            </Text>
            <SignalTrail className="-mb-2" />
            <SpecularButton href={registrationUrl} size="lg" arrow>
              Register now
            </SpecularButton>
          </>
        ) : (
          <>
            <Text visualStyle="body-lg" tone="secondary">
              Registration details for this event have not been announced yet.
            </Text>
            <SpecularButton href="/events" size="lg" variant="secondary">
              Browse all events
            </SpecularButton>
          </>
        )}
      </Reveal>
    </Section>
  );
}
