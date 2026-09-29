import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/navigation/NavBar";
import { Button } from "@/components/ui/Button";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { navLinks } from "./fixtures";
import { ColorSection } from "./_sections/ColorSection";
import { CommunitySection } from "./_sections/CommunitySection";
import { EventsSection } from "./_sections/EventsSection";
import { HeroSection } from "./_sections/HeroSection";
import { ImagerySection } from "./_sections/ImagerySection";
import { ScheduleSection } from "./_sections/ScheduleSection";
import { StatesSection } from "./_sections/StatesSection";
import { SystemSection } from "./_sections/SystemSection";
import { TypographySection } from "./_sections/TypographySection";

export const metadata: Metadata = {
  title: "Design System | IEEE Week",
  description:
    "The IEEE Week visual system: colour, type, imagery, components and states.",
};

/**
 * Composition-only showcase, built as a miniature of the real product. All
 * content lives in ./fixtures and is placeholder data.
 */
export default function DesignSystemPage() {
  return (
    <>
      <NavBar
        year="2026"
        links={navLinks}
        cta={{ label: "Register", href: "#events" }}
      />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ColorSection />
        <TypographySection />
        <EventsSection />
        <ImagerySection />
        <CommunitySection />
        <ScheduleSection />
        <StatesSection />
        <SystemSection />

        <Section
          tone="deep"
          spacing="md"
          decor={
            <Decor
              variant="rings-on-deep"
              at="100% 0%"
              className="top-0 right-0 h-[36rem] w-[36rem]"
            />
          }
        >
          <div className="flex max-w-2xl flex-col items-start gap-6">
            <Heading as="h2" visualStyle="h1" tone="deep">
              Ready to build the <em>real</em> homepage.
            </Heading>
            <Text visualStyle="body-lg" tone="on-deep-secondary">
              The system is set. Next up: compose the homepage from these
              sections and wire real event data.
            </Text>
            <Button href="#foundations" onDeep size="lg" arrow>
              Back to the top
            </Button>
          </div>
        </Section>
      </main>

      <footer
        className="bg-surface-deep text-content-on-deep"
        data-surface="deep"
      >
        <div className="container-page border-line-on-deep flex flex-col gap-3 border-t py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-sm text-content-on-deep-secondary">
            IEEE Week is organised by the university IEEE Student Branch.
          </p>
          <Link
            href="/"
            className="type-body-sm rounded-tag text-content-on-deep hover:text-content-on-deep-accent underline underline-offset-4"
          >
            Back to home
          </Link>
        </div>
      </footer>
    </>
  );
}
