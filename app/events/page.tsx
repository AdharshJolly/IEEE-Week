import { redirect } from "next/navigation";
import { getEvents } from "@/lib/events";

export default async function EventsPage() {
  const events = await getEvents();
  
  if (events.length > 0) {
    redirect(`/events/${events[0].slug}`);
  }

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-content-secondary">No events scheduled.</p>
    </div>
  );
}
