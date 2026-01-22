export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  updatedAt: string;
  assignee?: string;
};

export type TicketsResponse = {
  data: Ticket[];
  nextPage: number | null;
};
