import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default function EventsPage() {
  return (
    <Container as="section" className="flex flex-col gap-3 py-16">
      <Heading as="h1" visualStyle="heading-lg">
        Events
      </Heading>
      <Text visualStyle="body" className="text-content-secondary">
        Event discovery is not implemented yet — this route is a structural
        placeholder for the foundation phase.
      </Text>
    </Container>
  );
}
