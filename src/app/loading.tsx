export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"></div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we prepare everything for you.
          </p>
        </div>
      </div>
    </div>
  );
}
