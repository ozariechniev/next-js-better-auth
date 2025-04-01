export default function Loading() {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="mb-5 text-2xl">User Profile</h1>
      <div className="@container">
        <div className="mb-5 grid grid-cols-1 gap-6 overflow-hidden @lg:grid-cols-[3fr_1fr]">
          <div className="h-60 animate-pulse rounded-xl border bg-gray-200"></div>
          <div className="h-60 animate-pulse rounded-xl bg-gray-200"></div>
        </div>
        <div className="h-60 animate-pulse rounded-xl bg-gray-200"></div>
      </div>
    </div>
  );
}
