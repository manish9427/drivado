export function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-3 text-center">
      <p className="text-sm text-gray-600">No tickets found.</p>
      <button
        onClick={onClearFilters}
        className="rounded border px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        Clear filters
      </button>
    </div>
  );
}
