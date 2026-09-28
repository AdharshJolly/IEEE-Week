import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return (
    <Container as="section" className="flex flex-col gap-3 py-16">
      <Heading as="h1" visualStyle="heading-lg">
        Register for event {eventId}
      </Heading>
      <Text visualStyle="body" className="text-content-secondary">
        Registration is not implemented yet — this route is a structural
        placeholder for the foundation phase.
      </Text>
    </Container>
  );
}
