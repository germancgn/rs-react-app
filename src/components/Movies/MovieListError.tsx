type MovieListErrorProps = {
  error: Error;
  onRetry: () => void;
};

export default function MovieListError({
  error,
  onRetry,
}: MovieListErrorProps) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="max-w-full p-4 h-fit flex flex-col gap-4 border border-gray-300 dark:border-gray-800 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Something went wrong
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Error: {error.message}
        </p>

        <div className="self-center">
          <button
            onClick={() => onRetry()}
            className="py-2 px-4 bg-[#e94560] text-white rounded-full hover:bg-[#d13450] hover:cursor-pointer flex items-center gap-2 disabled:opacity-60"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
