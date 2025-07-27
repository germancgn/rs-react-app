import { CaretLeft, CaretRight } from './Icon';

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
    <div className="flex justify-center items-center space-x-4 mt-4 ">
      <div className="flex items-center bg-[#222240] rounded-xl">
        <button
          data-testid="prev-page-button"
          onClick={onPrevPage}
          disabled={page === 1}
          className="p-4 text-white rounded-xl disabled:opacity-50 cursor-pointer hover:bg-[#303059]"
        >
          <CaretLeft size={20} />
        </button>
        <span className="text-gray-300 px-2">
          {page} - {totalPages}
        </span>
        <button
          data-testid="next-page-button"
          onClick={onNextPage}
          disabled={page === totalPages}
          className="p-4 text-white rounded-xl disabled:opacity-50 cursor-pointer hover:bg-[#303059]"
        >
          <CaretRight size={20} />
        </button>
      </div>
    </div>
  );
}
