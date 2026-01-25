import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const resolvedParams = await params;
  const ticket = await Ticket.findById(resolvedParams.id);
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const body = await req.json();
  const resolvedParams = await params;
  const ticket = await Ticket.findByIdAndUpdate(resolvedParams.id, body, { new: true });
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const resolvedParams = await params;
  await Ticket.findByIdAndDelete(resolvedParams.id);
  return Response.json({ success: true });
}
