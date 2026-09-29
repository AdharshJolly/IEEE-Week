import { type ReactNode } from "react";
import { Eyebrow, Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

/** Stacked section header: one message, headline over a readable measure. */
export function SectionIntro({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-4", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h2" visualStyle="h1" className="reveal">
        {title}
      </Heading>
      {children && (
        <Text
          visualStyle="body-lg"
          tone="secondary"
          className="reveal max-w-xl"
        >
          {children}
        </Text>
      )}
    </div>
  );
}

/** Small labelled group heading inside a section. */
export function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="type-eyebrow text-content-tertiary mb-5">{children}</h3>
  );
}
