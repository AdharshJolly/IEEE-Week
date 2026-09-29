import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { Photo, type PhotoProps } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { featuredEvent, standIn } from "../fixtures";
import { GroupLabel, SectionIntro } from "./SectionIntro";

const ratios: {
  label: string;
  note: string;
  aspect: PhotoProps["aspect"];
  shape: PhotoProps["shape"];
  tone: PhotoProps["tone"];
  span: string;
}[] = [
  {
    label: "4:3",
    note: "Event card",
    aspect: "4/3",
    shape: "card",
    tone: "blue",
    span: "col-span-2 md:col-span-4",
  },
  {
    label: "4:5",
    note: "Speaker, leaf crop",
    aspect: "4/5",
    shape: "leaf",
    tone: "purple",
    span: "col-span-1 md:col-span-3",
  },
  {
    label: "1:1",
    note: "Society",
    aspect: "square",
    shape: "card",
    tone: "cyan",
    span: "col-span-1 md:col-span-2",
  },
  {
    label: "3:2",
    note: "Gallery",
    aspect: "3/2",
    shape: "card",
    tone: "orange",
    span: "col-span-2 md:col-span-3",
  },
];

const treatments: {
  label: string;
  note: string;
  treatment: PhotoProps["treatment"];
}[] = [
  {
    label: "Natural",
    note: "Gallery and documentary shots",
    treatment: "natural",
  },
  {
    label: "Brand grade",
    note: "Hero and cards: cool soft-light overlay",
    treatment: "brand",
  },
  { label: "Scrim", note: "Any photo that carries type", treatment: "scrim" },
];

export function ImagerySection() {
  return (
    <Section id="imagery" tone="muted" spacing="md">
      <SectionIntro
        eyebrow="Imagery"
        title="Photos are the loudest thing on the page."
      >
        Every image follows the same rules for ratio, crop, focal point and
        grade, so a page of mixed photography still reads as one event.
      </SectionIntro>

      <div className="mt-14">
        <GroupLabel>Ratios and crops</GroupLabel>
        <div className="grid grid-cols-2 items-end gap-x-5 gap-y-8 md:grid-cols-12">
          {ratios.map((r) => (
            <figure
              key={r.label}
              className={`m-0 flex flex-col gap-3 ${r.span}`}
            >
              <Photo aspect={r.aspect} shape={r.shape} tone={r.tone} />
              <figcaption className="type-meta text-content-secondary">
                {r.label}{" "}
                <span className="text-content-tertiary">{r.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="type-body-sm text-content-secondary mt-8 max-w-xl">
          Placeholders use the same composition system as real photography: a
          tinted field, one cropped circle in the category hue and cropped
          rings. Leaf crops (two large corners, two tight ones) are the
          signature shape for hero and portrait imagery.
        </p>
      </div>

      <div className="mt-20">
        <GroupLabel>Treatments, one source photo</GroupLabel>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {treatments.map((t) => (
            <figure key={t.label} className="m-0 flex flex-col gap-3">
              <div className="relative">
                <Photo
                  src={standIn.crowd}
                  alt={`${t.label} treatment on a stand-in event photo`}
                  aspect="4/3"
                  shape="card"
                  treatment={t.treatment}
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
                {t.treatment === "scrim" && (
                  <p className="type-h3 text-content-on-deep absolute right-5 bottom-5 left-5">
                    Robotics finals, Tuesday
                  </p>
                )}
              </div>
              <figcaption>
                <span className="type-label">{t.label}</span>
                <span className="type-body-sm text-content-secondary block">
                  {t.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <GroupLabel>Hero moment: full-bleed with scrim</GroupLabel>
        <FeaturedEventCard
          {...featuredEvent}
          title="Robotics Finals: Central Arena"
          society="IEEE Robotics and Automation Society"
          category="competition"
          layout="overlay"
          image={standIn.crowd}
          imageAlt="A crowd around an arena (stand-in photography)"
          href="#imagery"
          ctaLabel="See the bracket"
        />
      </div>
    </Section>
  );
}
