import { CalendarDays } from "lucide-react";
import { type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { Eyebrow, Text } from "@/components/ui/Text";
import { CategoryTag } from "@/components/events/CategoryTag";
import { SERIES_NAME } from "@/lib/site/config";
import { standIn } from "../fixtures";

export function HeroSection() {
  return (
    <>
      <Section
        tone="default"
        spacing="none"
        className="pb-section-sm pt-10 lg:pt-16"
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
        <div className="grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-7">
            <Eyebrow className="rise-in">
              {SERIES_NAME} 2026 design language
            </Eyebrow>
            <Heading
              as="h1"
              visualStyle="hero"
              className="rise-in max-w-[13ch]"
              style={{ "--i": 1 } as CSSProperties}
            >
              Ideas worth <em>showing up</em> for.
            </Heading>
            <Text
              visualStyle="body-lg"
              tone="secondary"
              className="rise-in max-w-xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              A bright, editorial system for a week of workshops, talks and
              competitions across every IEEE society on campus.
            </Text>
            <div
              className="rise-in flex flex-wrap items-center gap-3"
              style={{ "--i": 3 } as CSSProperties}
            >
              <Button href="#events" size="lg" arrow>
                Browse events
              </Button>
              <Button href="#foundations" size="lg" variant="outline">
                See the foundations
              </Button>
            </div>
          </div>

          <div
            className="rise-in relative lg:col-span-5"
            style={{ "--i": 2 } as CSSProperties}
          >
            <div className="shape-leaf bg-surface-brand p-2.5">
              <Photo
                src={standIn.hall}
                alt="Students gathered in a lecture hall (stand-in photography)"
                shape="leaf"
                treatment="brand"
                aspect="4/5"
                priority
                className="max-h-[34rem] w-full"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="rounded-card bg-surface-elevated shadow-float relative z-10 mx-3 -mt-14 flex items-center gap-4 p-4 sm:mx-8 lg:absolute lg:-bottom-6 lg:-left-16 lg:m-0 lg:max-w-[19rem]">
              <span className="rounded-control bg-surface-brand text-content-brand flex size-11 shrink-0 items-center justify-center">
                <CalendarDays
                  className="size-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <div className="flex min-w-0 flex-col gap-1.5">
                <p className="type-title">Opening keynote</p>
                <div className="flex items-center gap-2">
                  <CategoryTag category="talk" size="sm" />
                  <span className="type-meta text-content-tertiary">
                    Mon, 09:30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="default" spacing="none" className="pb-section-sm">
        <div className="border-line m-0 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-10 lg:grid-cols-4 lg:gap-0">
          {[
            { value: "24", label: "Events", detail: "Across five formats" },
            { value: "6", label: "Societies", detail: "One student branch" },
            { value: "18", label: "Speakers", detail: "Industry and alumni" },
            { value: "5", label: "Days", detail: "Mon to Fri" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={
                index > 0
                  ? "lg:border-line-subtle lg:border-l lg:pl-8"
                  : undefined
              }
            >
              <StatCard
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
