import { Counter, type CounterTone } from "@/components/ui/Counter";
import { Section } from "@/components/ui/Section";
import { counter } from "@/lib/motion/tokens";
import { CounterPlayground } from "./CounterPlayground";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const use = [
  "A figure that changes while the person watches: a result count after a filter, a live tally, a value they adjust.",
  "Quantities where the change itself is information, so rolling digits help the eye follow what moved.",
];

const avoid = [
  "Static figures (counts of events, societies or days that never change on the page). Plain text is clearer.",
  "Decorative count-up on scroll, or any number that only animates to look lively.",
  "Dates, times, IDs, codes or anything that is a label rather than a quantity.",
  "Combined with PixelReveal, BorderGlow, spotlight or magnetic effects on the same element.",
];

const behaviour = [
  `Each digit place rolls on a damped spring (stiffness ${counter.stiffness}, damping ${counter.damping}). It is overdamped, so it never overshoots into a wrong digit.`,
  "Reduced motion: no roll. The new value shows immediately, with the same layout.",
  "Assistive tech reads one visually-hidden value; the rolling digits are aria-hidden. To announce changes, wrap the sentence in a polite live region (as the events filter count does).",
  "Digits are 1ch wide with tabular numerals and every size is in em, so any value, font size or digit count lays out without fixed dimensions.",
];

const decimals: { value: number; decimals?: number }[] = [
  { value: 3.14 },
  { value: 2.5, decimals: 2 },
  { value: 0.07 },
  { value: 19.94, decimals: 1 },
];

const pairings: {
  surface: "default" | "brand" | "accent" | "deep";
  tone: CounterTone;
  bg: string;
}[] = [
  { surface: "default", tone: "primary", bg: "bg-surface-default" },
  { surface: "brand", tone: "brand", bg: "bg-surface-brand" },
  { surface: "accent", tone: "primary", bg: "bg-surface-accent" },
  { surface: "deep", tone: "on-deep", bg: "bg-surface-deep" },
];

/** COUNTER primitive: quantitative information that changes. */
export function CounterSection() {
  return (
    <Section id="counter" tone="subtle" spacing="md">
      <SectionIntro eyebrow="Counter" title="Numbers that show they changed.">
        Counter is for quantitative information. When a figure changes, its
        digits roll to the new value, so the change reads as a change. It is a
        data display primitive, not a decorative effect.
      </SectionIntro>

      <div className="mt-12 flex flex-col gap-16">
        <div>
          <GroupLabel>Interactive: arbitrary values, all sizes</GroupLabel>
          <CounterPlayground />
        </div>

        <div>
          <GroupLabel>Sizes (it inherits the font size around it)</GroupLabel>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <span className="type-meta">
              <Counter value={5} tone="primary" surface="subtle" />
            </span>
            <span className="font-display text-3xl font-bold">
              <Counter value={64} tone="primary" surface="subtle" />
            </span>
            <span className="font-display text-5xl font-bold">
              <Counter value={365} tone="primary" surface="subtle" />
            </span>
            <span className="font-display text-7xl font-bold">
              <Counter value={2048} tone="primary" surface="subtle" />
            </span>
          </div>
        </div>

        <div>
          <GroupLabel>Decimals and custom places</GroupLabel>
          <div className="font-display flex flex-wrap items-end gap-x-10 gap-y-6 text-4xl font-bold">
            {decimals.map((d) => (
              <Counter
                key={`${d.value}-${d.decimals}`}
                value={d.value}
                decimals={d.decimals}
                tone="primary"
                surface="subtle"
              />
            ))}
            <Counter
              value={7}
              places={[100, 10, 1]}
              tone="brand"
              surface="subtle"
            />
            <Counter
              value={90}
              places={[10, 1, ".", 0.1]}
              tone="brand"
              surface="subtle"
            />
            <Counter value={-12.5} tone="primary" surface="subtle" />
          </div>
          <p className="type-caption text-content-secondary mt-3 max-w-xl">
            <code>places</code> fixes the layout ([100, 10, 1] pads 7 to 007).{" "}
            <code>decimals</code> fixes the precision (2.5 reads 2.50).
          </p>
        </div>

        <div>
          <GroupLabel>Text and surface pairings</GroupLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pairings.map(({ surface, tone, bg }) => (
              <div
                key={surface}
                data-surface={surface === "deep" ? "deep" : undefined}
                className={`${bg} rounded-card flex flex-col gap-2 p-6`}
              >
                <p className="font-display text-5xl font-bold">
                  <Counter value={128} surface={surface} tone={tone} />
                </p>
                <p
                  className={`type-tech ${surface === "deep" ? "text-content-on-deep-secondary" : "text-content-tertiary"}`}
                >
                  {surface} · {tone}
                </p>
              </div>
            ))}
          </div>
          <p className="type-caption text-content-secondary mt-3 max-w-xl">
            Pass the <code>surface</code> it sits on so the edge fade blends
            into it, and pick the <code>tone</code> from the content tokens.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <GroupLabel>Use it for</GroupLabel>
            <ul className="type-body-sm text-content-secondary m-0 flex list-disc flex-col gap-2 pl-5">
              {use.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <GroupLabel>Avoid</GroupLabel>
            <ul className="type-body-sm text-content-secondary m-0 flex list-disc flex-col gap-2 pl-5">
              {avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <GroupLabel>Behaviour</GroupLabel>
          <ul className="type-body-sm text-content-secondary m-0 flex max-w-3xl list-disc flex-col gap-2 pl-5">
            {behaviour.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
