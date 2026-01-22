"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { useInfiniteTickets } from "@/hooks/useInfiniteTickets";
import { TicketCard } from "@/components/tickets/TicketCard";
import { SkeletonList } from "@/components/tickets/SkeletonList";
import { ErrorState } from "@/components/tickets/ErrorState";
import { EmptyState } from "@/components/tickets/EmptyState";
import { NextPageLoader } from "@/components/tickets/NextPageLoader";
import { EndOfResults } from "@/components/tickets/EndOfResults";
import { HeaderControls } from "@/components/tickets/HeaderControls";

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteTickets({ search, status, sort });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.9 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    return () => unsub();
  }, [scrollYProgress, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tickets = data?.pages.flatMap((p) => p.data) ?? [];

  if (isLoading) {
    return (
      <div className="h-screen overflow-y-auto px-4 py-6">
        <SkeletonList />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen overflow-y-auto px-4 py-6">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="h-screen overflow-y-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Support Tickets</h1>
          <p className="text-xs text-gray-500">
            {tickets.length} tickets loaded
          </p>
        </div>
      </div>

      <HeaderControls
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        onReset={() => {
          setSearch("");
          setStatus("");
          setSort("desc");
        }}
      />

      {tickets.length === 0 ? (
        <EmptyState
          onClearFilters={() => {
            setSearch("");
            setStatus("");
            setSort("desc");
          }}
        />
      ) : (
        <ul className="space-y-4">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </ul>
      )}

      {isFetchingNextPage && <NextPageLoader />}
      {!hasNextPage && tickets.length > 0 && <EndOfResults />}
    </div>
  );
}
