export function SkeletonList() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="animate-pulse rounded-lg border bg-white p-4 space-y-3"
        >
          <div className="h-3 w-2/3 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}
