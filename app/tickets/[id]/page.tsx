import { notFound } from "next/navigation";
export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const resolvedParams = await params;
  const res = await fetch(`${baseUrl}/api/tickets/${resolvedParams.id}`, { cache: "no-store" });

  if (!res.ok) {
    notFound();
  }

  const ticket = await res.json();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-lg font-semibold">{ticket.title}</h1>
      <p className="mt-2 text-sm text-gray-700">{ticket.description}</p>
      <div className="mt-4 text-xs text-gray-500">
        <p>Status: {ticket.status}</p>
        <p>Priority: {ticket.priority}</p>
        {ticket.assignee && <p>Assignee: {ticket.assignee}</p>}
      </div>
    </div>
  );
}
