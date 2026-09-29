import { Button } from "@/components/ui/Button";
import { Decor } from "@/components/ui/Decor";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const shapes = [
  {
    name: "Tag",
    token: "rounded-tag",
    px: "4px",
    cls: "rounded-tag",
    use: "Badges, category tags",
  },
  {
    name: "Control",
    token: "rounded-control",
    px: "10px",
    cls: "rounded-control",
    use: "Buttons, inputs, chips, tabs",
  },
  {
    name: "Card",
    token: "rounded-card",
    px: "18px",
    cls: "rounded-card",
    use: "Cards, alerts, popovers",
  },
  {
    name: "Panel",
    token: "rounded-panel",
    px: "32px",
    cls: "rounded-panel",
    use: "Featured blocks, dialogs",
  },
  {
    name: "Leaf",
    token: "shape-leaf",
    px: "32 / 4",
    cls: "shape-leaf",
    use: "Hero and portrait crops",
  },
  {
    name: "Full",
    token: "rounded-full",
    px: "50%",
    cls: "rounded-full",
    use: "Avatars and dots only",
  },
];

const elevations = [
  { name: "Rest", cls: "shadow-rest", use: "Buttons, solid cards" },
  { name: "Raised", cls: "shadow-raised", use: "Hover, floating nav" },
  { name: "Overlay", cls: "shadow-overlay", use: "Toasts, menus" },
  { name: "Float", cls: "shadow-float", use: "Dialogs, hero panels" },
];

const motion = [
  { token: "instant", ms: "90ms", use: "Press feedback" },
  { token: "fast", ms: "150ms", use: "Colour, hover tints" },
  { token: "base", ms: "260ms", use: "Buttons, chips, tabs" },
  { token: "slow", ms: "480ms", use: "Card lift, image zoom" },
  { token: "reveal", ms: "720ms", use: "Load-in, scroll reveal" },
];

const decor = [
  { name: "Dot field", variant: "dots" as const },
  { name: "Line grid", variant: "grid" as const },
  { name: "Cropped rings", variant: "rings" as const },
  { name: "Tinted field", variant: "field-cyan" as const },
];

const checks = [
  "Text contrast 4.5:1 or better on every surface, verified per token",
  "Two-tone focus ring: 2px blue with 3px offset, cyan on navy",
  "Touch targets 44px on buttons, chips, tabs and page links",
  "prefers-reduced-motion removes load-in, reveal and hover motion",
  "Native dialog, disclosure and radio semantics; skip link included",
  "State always pairs an icon or text with colour",
];

export function SystemSection() {
  return (
    <Section id="system" tone="muted" spacing="md">
      <SectionIntro
        eyebrow="System"
        title="Shape, depth and motion, with rules."
      >
        A hierarchy of shapes instead of one radius, tinted shadows instead of
        grey ones, and motion that only ever explains something.
      </SectionIntro>

      <div className="mt-14">
        <GroupLabel>Shape hierarchy</GroupLabel>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-8 p-0 md:grid-cols-3 lg:grid-cols-6">
          {shapes.map((s) => (
            <li key={s.name} className="flex flex-col gap-3">
              <div
                className={cn(
                  "bg-interactive-primary aspect-square w-full",
                  s.cls,
                )}
                aria-hidden="true"
              />
              <div>
                <p className="type-label">{s.name}</p>
                <p className="type-meta text-content-tertiary">{s.px}</p>
                <p className="type-caption text-content-secondary mt-1">
                  {s.use}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <GroupLabel>Elevation</GroupLabel>
        <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {elevations.map((e) => (
            <li
              key={e.name}
              className={cn(
                "rounded-card bg-surface-elevated flex h-36 flex-col justify-end p-5",
                e.cls,
              )}
            >
              <p className="type-label">{e.name}</p>
              <p className="type-caption text-content-secondary">{e.use}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 grid gap-x-12 gap-y-14 lg:grid-cols-2">
        <div>
          <GroupLabel>Motion</GroupLabel>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Duration tokens</caption>
            <thead className="sr-only">
              <tr>
                <th>Token</th>
                <th>Duration</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              {motion.map((m) => (
                <tr
                  key={m.token}
                  className="border-line-subtle border-b last:border-0"
                >
                  <th
                    scope="row"
                    className="type-label py-3 pr-4 font-semibold"
                  >
                    {m.token}
                  </th>
                  <td className="type-meta text-content-secondary py-3 pr-4">
                    {m.ms}
                  </td>
                  <td className="type-body-sm text-content-secondary py-3">
                    {m.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="type-body-sm text-content-secondary mt-4 max-w-md">
            Easing is a single decelerating curve (
            <span className="type-meta">0.16, 1, 0.3, 1</span>). Only transform
            and opacity animate. Scroll reveals are CSS-driven and switch off
            under reduced motion.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button arrow>Hover and press me</Button>
          </div>
        </div>

        <div>
          <GroupLabel>Decorative language</GroupLabel>
          <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0">
            {decor.map((d) => (
              <li key={d.name} className="flex flex-col gap-2">
                <div className="rounded-card bg-surface-default relative isolate h-32 overflow-hidden">
                  <Decor
                    variant={d.variant}
                    at="100% 0%"
                    className="inset-0 !z-0"
                  />
                </div>
                <p className="type-label">{d.name}</p>
              </li>
            ))}
          </ul>
          <p className="type-body-sm text-content-secondary mt-4 max-w-md">
            Always tinted from the palette, masked to fade out and hidden from
            assistive tech. Never more than two per section.
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <GroupLabel>Responsive behaviour</GroupLabel>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {[
              [
                "Mobile",
                "Single column, 20px gutters, photo below copy, nav collapses to a disclosure.",
              ],
              [
                "Tablet",
                "Two-column grids, hero keeps the leaf photo beside the type.",
              ],
              [
                "Desktop",
                "12-column layouts, 80rem container, sticky day labels, overlapping panels.",
              ],
            ].map(([k, v]) => (
              <li key={k} className="type-body-sm text-content-secondary">
                <span className="type-label text-content-primary">{k}. </span>
                {v}
              </li>
            ))}
          </ul>
        </div>
        <div
          data-surface="deep"
          className="rounded-panel bg-surface-deep text-content-on-deep relative isolate overflow-hidden p-7 sm:p-10 lg:col-span-7"
        >
          <Decor variant="rings-on-deep" at="100% 100%" className="inset-0" />
          <h3 className="type-h3">Accessibility bar</h3>
          <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
            {checks.map((c) => (
              <li
                key={c}
                className="type-body-sm text-content-on-deep-secondary"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
