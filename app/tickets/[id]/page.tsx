import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/tickets/DeleteButton";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  await connectDB();
  const resolvedParams = await params;
  const ticket = await Ticket.findById(resolvedParams.id);

  if (!ticket) {
    notFound();
  }

  const ticketData = {
    id: ticket._id.toString(),
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.assignee,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* 🔼 Add this block ABOVE the ticket box */}
      <div className="mb-4 flex items-center justify-between">
        <Link href="/tickets" className="text-sm text-blue-600 hover:underline">
          ← Back to Tickets
        </Link>
        <div className="flex gap-3">
          <Link
            href={`/tickets/${ticketData.id}/edit`}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <form
            action={`/api/tickets/${ticketData.id}`}
            method="POST"
          >
            <DeleteButton ticketId={ticketData.id} />
          </form>
        </div>
      </div>

      {/* ✅ Ticket details box */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold">{ticketData.title}</h1>
        <p className="mt-2 text-sm text-gray-700">{ticketData.description}</p>

        <div className="mt-4 text-xs text-gray-500">
          <p>Status: {ticketData.status}</p>
          <p>Priority: {ticketData.priority}</p>
          {ticketData.assignee && <p>Assignee: {ticketData.assignee}</p>}
        </div>
      </div>
    </div>
  );
}
