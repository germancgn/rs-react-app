export function MovieCardSkeleton() {
  return (
    <div className="bg-white dark:bg-transparent text-white rounded-2xl">
      <div className="rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden shadow-md p-4 animate-pulse">
        <div className="w-full aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-xl" />
        <div className="flex flex-col gap-2 pt-4 pb-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
          <div className="flex gap-2 items-center">
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-600 rounded-full" />
            <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="h-4 flex-1 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
