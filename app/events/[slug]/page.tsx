import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Container as="section" className="flex flex-col gap-3 py-16">
      <Heading as="h1" visualStyle="heading-lg">
        Event: {slug}
      </Heading>
      <Text visualStyle="body" className="text-content-secondary">
        Event detail rendering is not implemented yet — this route is a
        structural placeholder for the foundation phase.
      </Text>
    </Container>
  );
}
