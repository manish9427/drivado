import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Ticket } from "@/models/Ticket";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = 10;

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") === "asc" ? 1 : -1;

  const query: any = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (status) query.status = status;

  const tickets = await Ticket.find(query)
    .sort({ createdAt: sort })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Ticket.countDocuments(query);

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
    nextPage: page * limit < total ? page + 1 : null,
  });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const ticket = await Ticket.create(body);

  return Response.json(
    {
      id: ticket._id.toString(),
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      assignee: ticket.assignee,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    },
    { status: 201 }
  );
}
