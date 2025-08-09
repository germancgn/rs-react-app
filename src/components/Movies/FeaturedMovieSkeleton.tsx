export default function FeaturedMovieSkeleton() {
  return (
    <div
      className="relative flex-shrink-0 w-[200px] rounded-2xl border border-gray-700 overflow-hidden shadow-md animate-pulse bg-white dark:bg-gray-900 "
      data-testid="featured-card-featured-skeleton"
    >
      <div className="absolute top-2 right-2 flex items-center justify-center z-10">
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="w-full aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-xl" />
    </div>
  );
}
