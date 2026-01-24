import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";

export async function GET() {
  await connectDB();
  const tickets = await Ticket.find().sort({ createdAt: -1 });

  return Response.json({
    data: tickets.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      assignee: t.assignee,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    })),
    nextPage: null,
  });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const ticket = await Ticket.create(body);

  return Response.json({
    id: ticket._id.toString(),
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.assignee,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  });
}
