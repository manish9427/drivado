import Link from "next/link";
import { format } from "date-fns";
import type { Ticket } from "@/lib/validation/ticket";

const statusColors: Record<string, string> = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {ticket.title}
          </h3>
          <p className="mt-1 text-xs text-gray-600 line-clamp-2">
            {ticket.description}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[ticket.status]}`}
        >
          {ticket.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
        <span>Priority {ticket.priority}</span>
        <span>{format(new Date(ticket.createdAt), "MMM d, yyyy")}</span>
      </div>

      {ticket.assignee && (
        <p className="mt-1 text-[11px] text-gray-500">
          Assignee: {ticket.assignee}
        </p>
      )}
    </Link>
  );
}
