import { Download } from "lucide-react";
import { CategoryTag } from "@/components/events/CategoryTag";
import { RegistrationStatus } from "@/components/events/RegistrationStatus";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Pagination } from "@/components/navigation/Pagination";
import { Tabs } from "@/components/navigation/Tabs";
import { Alert } from "@/components/ui/Alert";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { IconButton } from "@/components/ui/IconButton";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { Textarea } from "@/components/ui/Textarea";
import { TextField } from "@/components/ui/TextField";
import { categories, societyOptions, statuses } from "../fixtures";
import { FeedbackDemo } from "./FeedbackDemo";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const badgeVariants: BadgeVariant[] = [
  "brand",
  "accent",
  "special",
  "highlight",
  "neutral",
  "outline",
  "deep",
  "success",
  "warning",
  "error",
  "info",
];

export function StatesSection() {
  return (
    <Section id="states" tone="default" spacing="md">
      <SectionIntro eyebrow="Interaction" title="Every state, visible.">
        Hover, press, focus, loading, disabled and error all have a designed
        look. Tab through this page to see the focus ring.
      </SectionIntro>

      <div className="mt-14 flex flex-col gap-20">
        <div className="flex flex-col gap-8">
          <GroupLabel>Buttons</GroupLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Button arrow>Register now</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Cancel seat</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg" arrow>
              Large
            </Button>
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
            <IconButton aria-label="Download schedule" variant="outline">
              <Download
                className="size-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </IconButton>
          </div>
          <div
            data-surface="deep"
            className="rounded-panel bg-surface-deep flex flex-wrap items-center gap-3 p-6 sm:p-8"
          >
            <Button onDeep size="lg" arrow>
              Join the waitlist
            </Button>
            <Button onDeep variant="outline" size="lg">
              View schedule
            </Button>
            <Button onDeep variant="ghost" size="lg">
              Learn more
            </Button>
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <GroupLabel>Category and registration</GroupLabel>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((c) => (
                <CategoryTag key={c} category={c} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {statuses.map((s) => (
                <RegistrationStatus key={s} status={s} seatsLeft={12} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <GroupLabel>Badges</GroupLabel>
            <div className="flex flex-wrap gap-2.5">
              {badgeVariants.map((v) => (
                <Badge key={v} variant={v} size="lg">
                  {v}
                </Badge>
              ))}
            </div>
            <Text visualStyle="body-sm" tone="secondary" className="max-w-md">
              Badges are square-cornered labels. State is always text plus
              colour, never colour alone.
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <GroupLabel>Navigation</GroupLabel>
          <Breadcrumbs
            items={[
              { label: "Home", href: "#" },
              { label: "Events", href: "#events" },
              { label: "Embedded Systems Bootcamp" },
            ]}
          />
          <Tabs
            label="Event details"
            tabs={[
              {
                id: "about",
                label: "About",
                panel: (
                  <Text tone="secondary">
                    Hands-on introduction to microcontrollers.
                  </Text>
                ),
              },
              {
                id: "agenda",
                label: "Agenda",
                count: 4,
                panel: (
                  <Text tone="secondary">Four blocks across one morning.</Text>
                ),
              },
              {
                id: "faq",
                label: "FAQ",
                panel: (
                  <Text tone="secondary">
                    Bring a laptop; boards are provided.
                  </Text>
                ),
              },
            ]}
          />
          <Pagination page={5} pageCount={12} getHref={() => "#states"} />
        </div>

        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
          <form
            className="flex flex-col gap-6"
            aria-label="Registration form example"
          >
            <GroupLabel>Form controls</GroupLabel>
            <TextField
              label="Full name"
              hint="As it should appear on your badge."
              placeholder="Priya Menon"
              autoComplete="name"
            />
            <TextField
              label="Email"
              type="email"
              error="Enter an email address like name@college.edu."
              defaultValue="priya.menon@college"
            />
            <TextField label="Student ID" success defaultValue="22CS0417" />
            <Select
              label="Society"
              placeholder="Choose a society"
              options={societyOptions}
            />
            <Textarea
              label="Anything we should know?"
              optional
              hint="Dietary needs or accessibility requests."
            />
          </form>
          <div className="flex flex-col gap-8 lg:pt-9">
            <RadioGroup
              label="Ticket type"
              name="ticket"
              layout="cards"
              defaultValue="member"
              options={[
                {
                  value: "member",
                  label: "IEEE member",
                  description: "Free, priority seating",
                },
                {
                  value: "guest",
                  label: "Guest",
                  description: "Free, subject to availability",
                },
              ]}
            />
            <Checkbox
              label="Email me schedule changes"
              description="One message per change, never marketing."
              defaultChecked
            />
            <Checkbox label="I agree to the event code of conduct" error />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <GroupLabel>Feedback</GroupLabel>
          <div className="grid gap-4 lg:grid-cols-2">
            <Alert variant="info" title="Doors open at 09:00">
              Bring your badge QR code for a faster check-in.
            </Alert>
            <Alert variant="success" title="You are registered">
              We emailed your confirmation and calendar invite.
            </Alert>
            <Alert variant="warning" title="Only 12 seats left">
              Registration closes when the workshop fills.
            </Alert>
            <Alert
              variant="error"
              title="We could not save your registration"
              action={
                <Button size="sm" variant="outline">
                  Try again
                </Button>
              }
            >
              Check your connection and try again.
            </Alert>
          </div>
          <FeedbackDemo />
        </div>
      </div>
    </Section>
  );
}
