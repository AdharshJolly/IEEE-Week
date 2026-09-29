import { Photo, type PhotoTone } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export interface SpeakerCardProps {
  name: string;
  role?: string;
  org?: string;
  photo?: string;
  /** Talk title, shown in brand blue. */
  topic?: string;
  /** `stack`: leaf-cropped portrait above. `row`: round avatar beside. */
  layout?: "stack" | "row";
  /** Placeholder hue until a real portrait exists. */
  tone?: PhotoTone;
  className?: string;
}

export function SpeakerCard({
  name,
  role,
  org,
  photo,
  topic,
  layout = "stack",
  tone = "blue",
  className,
}: SpeakerCardProps) {
  const row = layout === "row";
  const affiliation = [role, org].filter(Boolean).join(", ");
  return (
    <article
      className={cn(
        "group flex",
        row ? "flex-row items-center gap-4" : "flex-col gap-4",
        className,
      )}
    >
      <Photo
        src={photo}
        alt={photo ? name : undefined}
        tone={tone}
        aspect={row ? "square" : "4/5"}
        shape={row ? "circle" : "leaf"}
        focal="face"
        sizes={row ? "4.5rem" : "(min-width: 1024px) 22vw, 45vw"}
        className={cn(row && "size-18 shrink-0")}
      />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="type-title">{name}</h3>
        {affiliation && (
          <p className="type-body-sm text-content-secondary">{affiliation}</p>
        )}
        {topic && <p className="type-meta text-content-brand mt-1">{topic}</p>}
      </div>
    </article>
  );
}
