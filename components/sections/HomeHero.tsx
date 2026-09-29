import { CalendarDays } from "lucide-react";
import { type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";

export interface HomeHeroProps {
  organization: string;
  year: string;
  summary: string;
  /** Shown in the floating card, e.g. "11 Nov – 18 Nov". */
  dateRange?: string;
  eventCount?: number;
  tentative?: boolean;
}

export function HomeHero({
  organization,
  year,
  summary,
  dateRange,
  eventCount,
  tentative,
}: HomeHeroProps) {
  return (
    <Section
      spacing="none"
      className="pb-section-sm pt-10 lg:pt-16"
      aria-labelledby="hero-title"
      decor={
        <>
          <Decor variant="grid" className="inset-0" />
          <Decor
            variant="rings-cyan"
            at="100% 0%"
            className="top-0 right-0 h-[40rem] w-[40rem]"
          />
          <Decor
            variant="field-purple"
            className="bottom-0 left-0 h-96 w-2/3"
          />
        </>
      }
    >
      <div className="grid items-center gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <Eyebrow className="rise-in">{organization}</Eyebrow>
          <Heading
            as="h1"
            id="hero-title"
            visualStyle="display"
            className="rise-in"
            style={{ "--i": 1 } as CSSProperties}
          >
            IEEE Week
            <br />
            <em>{year}</em>
          </Heading>
          <Text
            visualStyle="body-lg"
            tone="secondary"
            className="rise-in max-w-xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            {summary}
          </Text>
          <div
            className="rise-in flex flex-wrap items-center gap-3"
            style={{ "--i": 3 } as CSSProperties}
          >
            <Button href="/events" size="lg" arrow>
              Explore Events
            </Button>
            <Button href="#schedule" size="lg" variant="outline">
              View Schedule
            </Button>
          </div>
        </div>

        <div
          className="rise-in relative lg:col-span-5"
          style={{ "--i": 2 } as CSSProperties}
        >
          <div className="shape-leaf bg-surface-brand p-2.5">
            <Photo
              tone="blue"
              shape="leaf"
              aspect="4/5"
              className="max-h-[32rem] w-full"
            />
          </div>
          {dateRange && (
            <div className="rounded-card bg-surface-elevated shadow-float relative z-10 mx-3 -mt-14 flex items-center gap-4 p-4 sm:mx-8 lg:absolute lg:-bottom-6 lg:-left-16 lg:m-0 lg:max-w-[20rem]">
              <span className="rounded-control bg-surface-brand text-content-brand flex size-11 shrink-0 items-center justify-center">
                <CalendarDays
                  className="size-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="type-title">{dateRange}</p>
                <p className="type-meta text-content-tertiary">
                  {eventCount !== undefined && `${eventCount} events`}
                  {tentative && " · tentative"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
