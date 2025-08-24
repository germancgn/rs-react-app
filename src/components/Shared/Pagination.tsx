import { useTranslations } from 'next-intl';
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
  const t = useTranslations('HomePage');

  return (
    <div
      className="flex justify-center items-center space-x-4 mt-4"
      data-testid="pagination"
    >
      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl not-dark:shadow-2xs p-[1px]">
        <button
          data-testid="prev-page-button"
          onClick={onPrevPage}
          disabled={page === 1}
          className="p-4 text-gray-800 dark:text-white rounded-2xl disabled:opacity-50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <CaretLeft size={20} />
        </button>
        <span className="text-sm text-gray-400 dark:text-gray-300 px-2">
          <span className="">
            {t('pageText')} {page}
          </span>{' '}
          <span className="text-gray-300 dark:text-gray-400">
            {t('pageOfText')} {totalPages}
          </span>
        </span>
        <button
          data-testid="next-page-button"
          onClick={onNextPage}
          disabled={page === totalPages}
          className="p-4 text-gray-800 dark:text-white rounded-2xl disabled:opacity-50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <CaretRight size={20} />
        </button>
      </div>
    </div>
  );
}
