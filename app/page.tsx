import { ArrowRight, Bell, CalendarDays, Menu } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { Text } from "@/components/ui/Text";

const brandSwatches = [
  { name: "Primary Blue", token: "brand-primary", hex: "#00629B" },
  { name: "Dark Blue", token: "brand-dark", hex: "#002855" },
  { name: "Cyan", token: "brand-cyan", hex: "#00B5E2" },
  { name: "Purple", token: "brand-purple", hex: "#981D97" },
];

const statusSwatches = [
  {
    name: "Success",
    bg: "bg-status-success-surface",
    fg: "text-status-success",
  },
  {
    name: "Warning",
    bg: "bg-status-warning-surface",
    fg: "text-status-warning",
  },
  { name: "Error", bg: "bg-status-error-surface", fg: "text-status-error" },
  { name: "Info", bg: "bg-status-info-surface", fg: "text-status-info" },
];

const typeScale: Array<{
  label: string;
  visualStyle: "display" | "heading-lg" | "heading-md" | "heading-sm";
  sample: string;
}> = [
  { label: "Display", visualStyle: "display", sample: "IEEE Week" },
  {
    label: "Heading LG",
    visualStyle: "heading-lg",
    sample: "Events across every society",
  },
  {
    label: "Heading MD",
    visualStyle: "heading-md",
    sample: "Schedules and speakers",
  },
  {
    label: "Heading SM",
    visualStyle: "heading-sm",
    sample: "Registration confirmation",
  },
];

const bodyScale: Array<{
  label: string;
  visualStyle: "body-lg" | "body" | "body-sm" | "label" | "caption";
  sample: string;
}> = [
  {
    label: "Body LG",
    visualStyle: "body-lg",
    sample:
      "A week of talks, workshops and competitions hosted by every IEEE society on campus.",
  },
  {
    label: "Body",
    visualStyle: "body",
    sample:
      "A week of talks, workshops and competitions hosted by every IEEE society on campus.",
  },
  {
    label: "Body SM",
    visualStyle: "body-sm",
    sample:
      "A week of talks, workshops and competitions hosted by every IEEE society on campus.",
  },
  { label: "Label", visualStyle: "label", sample: "Event category" },
  { label: "Caption", visualStyle: "caption", sample: "Updated moments ago" },
];

export default function Home() {
  return (
    <>
      <header className="border-border bg-surface border-b">
        <Container
          as="header"
          className="flex h-16 items-center justify-between"
        >
          <span className="text-heading-sm text-content-primary">
            IEEE Week
          </span>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex"
          >
            <a
              href="#colors"
              className="text-body-sm text-content-secondary hover:text-content-primary"
            >
              Colors
            </a>
            <a
              href="#typography"
              className="text-body-sm text-content-secondary hover:text-content-primary"
            >
              Typography
            </a>
            <a
              href="#components"
              className="text-body-sm text-content-secondary hover:text-content-primary"
            >
              Components
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <IconButton
              aria-label="Notifications"
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              <Bell className="size-5" aria-hidden="true" />
            </IconButton>
            <IconButton
              aria-label="Open menu"
              variant="secondary"
              className="md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </IconButton>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-border bg-surface-raised border-b">
          <Container className="flex flex-col gap-6 py-16 sm:py-24">
            <Badge variant="brand">Design System Preview</Badge>
            <Heading as="h1" visualStyle="display" className="max-w-3xl">
              IEEE Week design system foundation
            </Heading>
            <Text
              visualStyle="body-lg"
              className="text-content-secondary max-w-2xl"
            >
              This page validates the token architecture and foundation
              components ahead of building the real IEEE Week homepage — colors,
              type hierarchy, spacing, elevation and interactive states, all
              built on the official IEEE brand palette.
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg">
                Explore events
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="secondary" size="lg">
                View schedule
                <CalendarDays className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="lg">
                Learn more
              </Button>
            </div>
          </Container>
        </section>

        {/* Colors */}
        <section id="colors" className="border-border border-b">
          <Container className="flex flex-col gap-8 py-16">
            <div className="flex flex-col gap-2">
              <Heading as="h2" visualStyle="heading-lg">
                Color
              </Heading>
              <Text visualStyle="body" className="text-content-secondary">
                Official IEEE brand colors, mapped to semantic tokens.
              </Text>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {brandSwatches.map((swatch) => (
                <div key={swatch.token} className="flex flex-col gap-3">
                  <div
                    className="shadow-subtle h-20 rounded-lg"
                    style={{ backgroundColor: swatch.hex }}
                    aria-hidden="true"
                  />
                  <div>
                    <Text visualStyle="label" as="span" className="block">
                      {swatch.name}
                    </Text>
                    <Text visualStyle="caption" as="span" className="block">
                      {swatch.hex}
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statusSwatches.map((swatch) => (
                <div
                  key={swatch.name}
                  className={`${swatch.bg} ${swatch.fg} flex h-20 items-center justify-center rounded-lg`}
                >
                  <Text visualStyle="label" as="span">
                    {swatch.name}
                  </Text>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Typography */}
        <section
          id="typography"
          className="border-border bg-surface-raised border-b"
        >
          <Container className="flex flex-col gap-8 py-16">
            <div className="flex flex-col gap-2">
              <Heading as="h2" visualStyle="heading-lg">
                Typography
              </Heading>
              <Text visualStyle="body" className="text-content-secondary">
                Manrope for display and heading levels; Inter for body, label
                and caption text.
              </Text>
            </div>

            <div className="flex flex-col gap-6">
              {typeScale.map((item) => (
                <div
                  key={item.label}
                  className="border-border flex flex-col gap-1 border-b pb-6 last:border-none"
                >
                  <Text visualStyle="caption" as="span">
                    {item.label}
                  </Text>
                  <Heading as="h3" visualStyle={item.visualStyle}>
                    {item.sample}
                  </Heading>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {bodyScale.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <Text visualStyle="caption" as="span">
                    {item.label}
                  </Text>
                  <Text visualStyle={item.visualStyle}>{item.sample}</Text>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Components */}
        <section id="components" className="border-border border-b">
          <Container className="flex flex-col gap-12 py-16">
            <div className="flex flex-col gap-2">
              <Heading as="h2" visualStyle="heading-lg">
                Components
              </Heading>
              <Text visualStyle="body" className="text-content-secondary">
                Foundation primitives — buttons, badges and cards built entirely
                from semantic tokens.
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <Text visualStyle="label" as="span">
                Buttons
              </Text>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <IconButton aria-label="Add to calendar" variant="primary">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </IconButton>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Text visualStyle="label" as="span">
                Badges
              </Text>
              <div className="flex flex-wrap gap-3">
                <Badge variant="brand">Brand</Badge>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Text visualStyle="label" as="span">
                Elevation &amp; spacing
              </Text>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-border bg-surface shadow-subtle rounded-lg border p-6">
                  <Text visualStyle="label" as="span">
                    Subtle
                  </Text>
                  <Text
                    visualStyle="body-sm"
                    className="text-content-secondary mt-1"
                  >
                    Resting card state.
                  </Text>
                </div>
                <div className="border-border bg-surface shadow-medium rounded-lg border p-6">
                  <Text visualStyle="label" as="span">
                    Medium
                  </Text>
                  <Text
                    visualStyle="body-sm"
                    className="text-content-secondary mt-1"
                  >
                    Hovered or highlighted card.
                  </Text>
                </div>
                <div className="border-border bg-surface shadow-prominent rounded-lg border p-6">
                  <Text visualStyle="label" as="span">
                    Prominent
                  </Text>
                  <Text
                    visualStyle="body-sm"
                    className="text-content-secondary mt-1"
                  >
                    Modals and popovers.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-surface-inverse">
        <Container className="flex flex-col gap-2 py-10">
          <Text visualStyle="body-sm" className="text-content-inverse">
            IEEE Week — organized by the university IEEE Student Branch.
          </Text>
          <Text
            visualStyle="caption"
            as="span"
            className="text-content-inverse opacity-70"
          >
            Design system validation page — not the final homepage.
          </Text>
        </Container>
      </footer>
    </>
  );
}
