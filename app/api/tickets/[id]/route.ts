import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  await connectDB();
  const ticket = await Ticket.findById(params.id);
  if (!ticket) return new Response("Not found", { status: 404 });

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

export async function PATCH(req: Request, { params }: Params) {
  await connectDB();
  const body = await req.json();

  const ticket = await Ticket.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!ticket) return new Response("Not found", { status: 404 });

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

export async function DELETE(_req: Request, { params }: Params) {
  await connectDB();
  await Ticket.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
