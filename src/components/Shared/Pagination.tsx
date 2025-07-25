type PaginationProps = {
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export function Pagination({
  page,
  totalPages,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={onPrevPage}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>
      <span className="text-gray-300">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
