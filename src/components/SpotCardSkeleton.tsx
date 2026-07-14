export default function SpotCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-teal/10 bg-white">
      <div className="h-48 w-full animate-pulse bg-brand-teal/10" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-brand-teal/10" />
        <div className="h-3 w-full animate-pulse rounded bg-brand-teal/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-brand-teal/10" />
      </div>
    </div>
  );
}
