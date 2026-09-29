import { Reveal } from "@/components/motion/Reveal";
import { SignalTrail } from "@/components/motion/SignalLine";
import { Button } from "@/components/ui/Button";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { SERIES_NAME } from "@/lib/site/config";

export interface FinalCtaAction {
  label: string;
  href: string;
}

export interface FinalCtaProps {
  year: string;
  note?: string;
  /** Defaults to "Explore Events" on `/events`. */
  primary?: FinalCtaAction;
  /** Defaults to "View Schedule"; pass `null` to omit. */
  secondary?: FinalCtaAction | null;
}

export function FinalCta({
  year,
  note,
  primary = { label: "Explore Events", href: "/events" },
  secondary = { label: "View Schedule", href: "#schedule" },
}: FinalCtaProps) {
  return (
    <Section
      tone="brand"
      spacing="md"
      aria-labelledby="cta-title"
      decor={
        <Decor
          variant="rings"
          at="0% 100%"
          className="bottom-0 left-0 h-[32rem] w-[32rem]"
        />
      }
    >
      <Reveal className="flex flex-col items-start gap-8 lg:max-w-2xl">
        <Heading as="h2" id="cta-title" visualStyle="h1">
          Plan your <em>
            {SERIES_NAME} {year}
          </em>.
        </Heading>
        {note && (
          <Text visualStyle="body-lg" tone="secondary">
            {note}
          </Text>
        )}
        <SignalTrail className="-mb-4" />
        <div className="flex flex-wrap items-center gap-3">
          <Button href={primary.href} size="lg" arrow>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} size="lg" variant="outline">
              {secondary.label}
            </Button>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
