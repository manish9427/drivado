type Props = {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  sort: "asc" | "desc";
  setSort: (v: "asc" | "desc") => void;
  onReset: () => void;
};

export function HeaderControls({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  onReset,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full rounded border px-3 py-1.5 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded border px-2 py-1.5 text-xs"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="rounded border px-2 py-1.5 text-xs"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="rounded border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
      >
        Reset
      </button>
    </div>
  );
}
