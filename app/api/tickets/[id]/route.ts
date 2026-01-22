import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;   // ✅ await the params
  await connectDB();

  const ticket = await Ticket.findById(id);
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

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();
  const body = await req.json();

  const ticket = await Ticket.findByIdAndUpdate(id, body, { new: true });
  if (!ticket) return new Response("Not found", { status: 404 });

  return Response.json(ticket);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();
  await Ticket.findByIdAndDelete(id);
  return Response.json({ success: true });
}
