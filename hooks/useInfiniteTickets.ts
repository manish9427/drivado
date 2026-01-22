import { useInfiniteQuery } from "@tanstack/react-query";
import type { Ticket, TicketsResponse } from "@/lib/validation/ticket";

type Params = {
  search?: string;
  status?: string;
  sort?: "asc" | "desc";
};

export function useInfiniteTickets(params: Params) {
  return useInfiniteQuery<TicketsResponse, Error>({
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

      return (await res.json()) as TicketsResponse;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}
