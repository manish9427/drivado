import { useInfiniteQuery } from "@tanstack/react-query";
import type { Ticket } from "@/lib/validation/ticket";

type Params = {
  search?: string;
  status?: string;
  sort?: "asc" | "desc";
};

type TicketsResponse = {
  data: Ticket[];
  nextPage: number | null;
};

export function useInfiniteTickets(params: Params) {
  return useInfiniteQuery<TicketsResponse>({
    queryKey: ["tickets", params],
    queryFn: async ({ pageParam = 1 }) => {
      const query = new URLSearchParams({
        page: String(pageParam),
        search: params.search || "",
        status: params.status || "",
        sort: params.sort || "desc",
      });

      const res = await fetch(`/api/tickets?${query}`);
      if (!res.ok) throw new Error("Failed to fetch tickets");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}
