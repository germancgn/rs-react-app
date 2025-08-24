import { MovieCardSkeleton } from '../../components/Movies/MovieCardSkeleton';

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
      data-testid="loading-page"
    >
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="hidden sm:flex gap-4">
            <div className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="h-6 w-10 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-6 w-10 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>

        <div className="flex gap-4 mb-32">
          <div className="h-10 w-48 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-10 w-24 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="h-10 w-48 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>

        <div className="flex mb-4 flex-wrap gap-4">
          <div className="h-6 w-28 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-28 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="flex mb-4 flex-wrap gap-4">
          <div className="h-6 w-12 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-24 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>

        <div className="flex gap-4 mb-16">
          <div className="h-12 w-28 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-12 w-36 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </div>

        <div className="mb-8">
          <div className="h-6 w-32 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
