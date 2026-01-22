import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(5).max(80),
  description: z.string().min(20),
  status: z.enum(["open", "in_progress", "resolved"]),
  priority: z.coerce.number().min(1).max(5),
  assignee: z
    .string()
    .min(2, "Assignee must be at least 2 characters")
    .optional()
    .or(z.literal("")),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

export type TicketStatus = "open" | "in_progress" | "resolved";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  updatedAt: string;
  assignee?: string;
};

// 👇 Separate type for API response
export type TicketsResponse = {
  data: Ticket[];
  nextPage: number | null;
};
