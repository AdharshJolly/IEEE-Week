import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const brand = [
  {
    name: "IEEE Blue",
    hex: "#00629B",
    swatch: "bg-brand-blue",
    span: "md:col-span-5",
    role: "Primary action, links, focus",
    contrast: "6.5:1 with white",
  },
  {
    name: "IEEE Dark Blue",
    hex: "#002855",
    swatch: "bg-brand-dark",
    span: "md:col-span-4",
    role: "All primary type, rare deep surfaces",
    contrast: "14.8:1 with white",
  },
  {
    name: "IEEE Cyan",
    hex: "#00B5E2",
    swatch: "bg-brand-cyan",
    span: "md:col-span-3",
    role: "Secondary accent, on-navy highlight",
    contrast: "6.1:1 with dark blue",
  },
  {
    name: "IEEE Purple",
    hex: "#981D97",
    swatch: "bg-brand-purple",
    span: "md:col-span-4",
    role: "Special accent: competitions",
    contrast: "7.1:1 with white",
  },
  {
    name: "IEEE Orange",
    hex: "#FFA300",
    swatch: "bg-brand-orange",
    span: "md:col-span-4",
    role: "Optional highlight: social",
    contrast: "7.3:1 with dark blue",
  },
  {
    name: "IEEE Gray",
    hex: "#75787B",
    swatch: "bg-brand-gray",
    span: "md:col-span-4",
    role: "Decoration only",
    contrast: "4.4:1 on white, fails AA as text",
  },
];

const ladder = [
  { token: "surface-default", cls: "bg-surface-default", note: "White canvas" },
  { token: "surface-subtle", cls: "bg-surface-subtle", note: "Blue 4%" },
  { token: "surface-muted", cls: "bg-surface-muted", note: "Blue 8%" },
  { token: "surface-brand", cls: "bg-surface-brand", note: "Blue 12%" },
  { token: "surface-accent", cls: "bg-surface-accent", note: "Cyan 12%" },
  { token: "surface-special", cls: "bg-surface-special", note: "Purple 8%" },
  {
    token: "surface-highlight",
    cls: "bg-surface-highlight",
    note: "Orange 12%",
  },
];

const groups: {
  title: string;
  rows: { token: string; cls: string; use: string }[];
}[] = [
  {
    title: "Content",
    rows: [
      {
        token: "content-primary",
        cls: "bg-content-primary",
        use: "Headings, body (14.8:1)",
      },
      {
        token: "content-secondary",
        cls: "bg-content-secondary",
        use: "Supporting copy (9.1:1)",
      },
      {
        token: "content-tertiary",
        cls: "bg-content-tertiary",
        use: "Metadata (6.9:1)",
      },
      {
        token: "content-muted",
        cls: "bg-content-muted",
        use: "Hints, placeholders (5.7:1)",
      },
      {
        token: "content-brand",
        cls: "bg-content-brand",
        use: "Links, emphasis (6.5:1)",
      },
    ],
  },
  {
    title: "Line",
    rows: [
      { token: "line", cls: "bg-line", use: "Cards, dividers" },
      { token: "line-subtle", cls: "bg-line-subtle", use: "Inside a card" },
      {
        token: "line-control",
        cls: "bg-line-control",
        use: "Inputs (3.1:1 edge)",
      },
      { token: "line-brand", cls: "bg-line-brand", use: "Hover, active card" },
    ],
  },
  {
    title: "Interactive",
    rows: [
      {
        token: "interactive-primary",
        cls: "bg-interactive-primary",
        use: "Primary action",
      },
      {
        token: "interactive-primary-hover",
        cls: "bg-interactive-primary-hover",
        use: "Hover",
      },
      {
        token: "interactive-primary-active",
        cls: "bg-interactive-primary-active",
        use: "Pressed",
      },
      {
        token: "interactive-secondary",
        cls: "bg-interactive-secondary",
        use: "Navy action",
      },
      {
        token: "interactive-focus",
        cls: "bg-interactive-focus",
        use: "Focus ring (cyan on navy)",
      },
    ],
  },
  {
    title: "Status",
    rows: [
      { token: "status-success", cls: "bg-status-success", use: "Open, saved" },
      {
        token: "status-warning",
        cls: "bg-status-warning",
        use: "Few seats left",
      },
      { token: "status-error", cls: "bg-status-error", use: "Failed, invalid" },
      { token: "status-info", cls: "bg-status-info", use: "Opens soon, notes" },
    ],
  },
];

// Proportion of visible area each role should own on a typical page.
const ratio = [
  {
    label: "White canvas",
    grow: 58,
    cls: "bg-surface-default border border-line",
  },
  { label: "IEEE tints", grow: 24, cls: "bg-surface-brand" },
  { label: "Dark blue type", grow: 9, cls: "bg-content-primary" },
  { label: "Blue action", grow: 5, cls: "bg-brand-blue" },
  { label: "Cyan", grow: 2.5, cls: "bg-brand-cyan" },
  { label: "Purple", grow: 1.5, cls: "bg-brand-purple" },
];

export function ColorSection() {
  return (
    <Section id="foundations" tone="subtle" spacing="md">
      <SectionIntro
        eyebrow="Foundations"
        title="Light by default. Colour as signal."
      >
        White and quiet IEEE tints carry the page. Saturated brand colour is
        reserved for actions, state and a single accent per view.
      </SectionIntro>

      <div className="mt-14 flex flex-col gap-3">
        <GroupLabel>Where the colour goes</GroupLabel>
        <div
          className="rounded-card flex h-14 overflow-hidden"
          role="img"
          aria-label="Approximate colour proportions: 58 percent white, 24 percent tints, 9 percent dark blue type, 9 percent saturated accents"
        >
          {ratio.map((r) => (
            <div key={r.label} style={{ flexGrow: r.grow }} className={r.cls} />
          ))}
        </div>
        <ul className="type-caption text-content-secondary m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
          {ratio.map((r) => (
            <li key={r.label}>
              {r.label} <span className="type-meta">{r.grow}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <GroupLabel>IEEE core palette</GroupLabel>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-12">
          {brand.map((c) => (
            <div key={c.name} className={cn("flex flex-col gap-3", c.span)}>
              <div
                className={cn(
                  "rounded-card shadow-rest duration-slow ease-emphasis h-36 transition-transform hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                  c.swatch,
                )}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-0.5">
                <p className="type-title">
                  {c.name}{" "}
                  <span className="type-meta text-content-tertiary ml-1">
                    {c.hex}
                  </span>
                </p>
                <p className="type-body-sm text-content-secondary">{c.role}</p>
                <p className="type-meta text-content-tertiary">{c.contrast}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <GroupLabel>Surface ladder: tints derived from the palette</GroupLabel>
        <div className="rounded-card border-line grid grid-cols-2 overflow-hidden border sm:grid-cols-4 lg:grid-cols-7">
          {ladder.map((s) => (
            <div
              key={s.token}
              className={cn("flex h-32 flex-col justify-end p-3.5", s.cls)}
            >
              <p className="type-meta">{s.token.replace("surface-", "")}</p>
              <p className="type-caption text-content-secondary">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((g) => (
          <div key={g.title}>
            <GroupLabel>{g.title}</GroupLabel>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {g.rows.map((r) => (
                <li key={r.token} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-tag ring-line-subtle mt-0.5 size-5 shrink-0 ring-1",
                      r.cls,
                    )}
                  />
                  <div className="min-w-0">
                    <p className="type-meta text-content-primary break-words">
                      {r.token}
                    </p>
                    <p className="type-caption text-content-tertiary">
                      {r.use}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
