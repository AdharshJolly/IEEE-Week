import { MaskedText } from "@/components/motion/MaskedText";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SignalField } from "@/components/motion/SignalLine";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { delay } from "@/lib/motion/tokens";
import { HeroReveal, type HeroRevealProps } from "./HeroReveal";

export interface HomeHeroProps {
  /** Event-series name, from `lib/site/config`. Any length. */
  title: string;
  organization: string;
  year: string;
  summary: string;
  /** e.g. "11 Nov – 18 Nov". */
  dateRange?: string;
  /** ISO date string for the countdown timer. */
  firstEventDate?: string;
  eventCount?: number;
  tentative?: boolean;
  /** Real content for the signature PixelReveal; omitted when there is none. */
  reveal?: HeroRevealProps;
}

/**
 * Editorial opening: a technical metadata strip, the series name at display
 * size across the full measure, then an asymmetric lower band (copy and
 * actions left, the signature reveal right). The name's length, words and
 * line count are never assumed.
 */
export function HomeHero({
  title,
  year,
  summary,
  firstEventDate,
  reveal,
}: HomeHeroProps) {
  return (
    <Section
      spacing="none"
      className="pb-section-sm pt-8 lg:pt-12"
      aria-labelledby="hero-title"
      decor={
        <>
          <Decor variant="grid" className="inset-0" />
          <SignalField ambient className="inset-0 h-full w-full" />
        </>
      }
    >
      <div className="flex flex-col gap-10 lg:gap-14">
        <Heading
          as="h1"
          id="hero-title"
          visualStyle="display"
          className="min-w-0 text-balance [overflow-wrap:anywhere]"
        >
          <MaskedText delay={delay.title}>
            {title}
            <br />
            <em>{year}</em>
          </MaskedText>
        </Heading>

        <Stagger
          trigger="mount"
          delay={delay.title + delay.afterTitle}
          className="grid items-start gap-x-10 gap-y-12 lg:grid-cols-12"
        >
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-5">
            <StaggerItem>
              <Text visualStyle="body-lg" tone="secondary" className="max-w-xl">
                {summary}
              </Text>
            </StaggerItem>
            <StaggerItem className="flex flex-wrap items-center gap-3">
              <SpecularButton href="/events" size="lg" arrow>
                Explore Events
              </SpecularButton>
              <SpecularButton href="#schedule" size="lg" variant="secondary">
                View Schedule
              </SpecularButton>
            </StaggerItem>
            {firstEventDate && (
              <StaggerItem className="border-line flex flex-col gap-4 border-t pt-6">
                <span className="type-tech text-content-tertiary">
                  Countdown to kickoff
                </span>
                <CountdownTimer targetDate={firstEventDate} />
              </StaggerItem>
            )}
          </div>

          {reveal && (
            <StaggerItem className="min-w-0 lg:col-span-6 lg:col-start-7">
              <HeroReveal {...reveal} />
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </Section>
  );
}
