import { TicketForm } from "@/components/tickets/TicketForm";

export default function NewTicketPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-lg font-semibold">Create New Ticket</h1>
      <TicketForm mode="create" />
    </div>
  );
}
