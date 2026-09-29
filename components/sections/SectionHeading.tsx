import { type ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";
import { Eyebrow, Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  onDeep?: boolean;
  className?: string;
}

/** Shared section opener: eyebrow, h2, optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  onDeep = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-4", className)}>
      {eyebrow && <Eyebrow onDeep={onDeep}>{eyebrow}</Eyebrow>}
      <Heading
        as="h2"
        visualStyle="h1"
        tone={onDeep ? "deep" : "primary"}
        id={id}
      >
        {title}
      </Heading>
      {description && (
        <Text
          visualStyle="body-lg"
          tone={onDeep ? "on-deep-secondary" : "secondary"}
        >
          {description}
        </Text>
      )}
    </div>
  );
}
