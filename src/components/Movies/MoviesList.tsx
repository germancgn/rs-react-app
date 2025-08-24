'use client';

import type { Movie } from '../../types/movies/Movie';
import { Pagination } from '../Shared/Pagination';
import MovieCard from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import { useMemo, useRef, useState } from 'react';
import { ArrowClockwise, Broom, CaretLeft, CaretRight } from '../Shared/Icon';
import { Spinner } from '../Shared/Spinner';
import { useQueryClient } from '@tanstack/react-query';
import MovieDetails from './MovieDetails';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type MoviesListProps = {
  title: string;
  movies: Movie[];
  isFetching: boolean;
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onReload: () => void;
};

export default function MoviesList({
  title,
  movies,
  isFetching,
  page,
  totalPages,
  onNextPage,
  onPrevPage,
  onReload,
}: MoviesListProps) {
  const broomRef = useRef<HTMLSpanElement | null>(null);
  const [isCleaningCache, setIsCleaningCache] = useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  if (!searchParams) return null;
  const details = searchParams.get('details');
  const skeletons = useMemo(
    () => Array.from({ length: 20 }, (_, i) => <MovieCardSkeleton key={i} />),
    []
  );
  const t = useTranslations('HomePage');

  const handleInvalidateAll = () => {
    queryClient.invalidateQueries({
      stale: false,
    });
    setIsCleaningCache(true);
    setTimeout(() => {
      setIsCleaningCache(false);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex mb-8 gap-4">
        <h2 className="flex gap-4 text-2xl text-gray-800 dark:text-white font-bold">
          {title}
        </h2>
        <button
          className="flex text-sm font-normal gap-2 items-center rounded-full bg-white dark:bg-gray-800 py-2 px-2 cursor-pointer text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          onClick={onReload}
          disabled={isFetching}
        >
          {isFetching ? <Spinner size={20} /> : <ArrowClockwise size={20} />}
          {t('refreshText')}
        </button>

        <div className="flex text-sm font-normal gap-4 items-center rounded-full bg-white dark:bg-gray-800 cursor-pointer transition-colors px-2">
          <button
            onClick={onPrevPage}
            className="p-1 cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <CaretLeft />
          </button>
          <div className="flex gap-2">
            <span className="text-gray-500 dark:text-gray-300">{page}</span>
            <span className="text-gray-400">
              {t('pageOfText')} {totalPages}
            </span>
          </div>
          <button
            onClick={onNextPage}
            className="p-1 cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <CaretRight />
          </button>
        </div>
        <button
          onClick={handleInvalidateAll}
          className="flex text-sm font-normal gap-2 items-center rounded-full bg-white dark:bg-gray-800 py-2 px-2 cursor-pointer text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <span
            ref={broomRef}
            className={`inline-block ${isCleaningCache ? 'broom-shake' : ''}`}
          >
            <Broom />
          </span>
          {t('invalidateAllText')}
        </button>
      </div>
      <div className="flex gap-4 relative">
        <div className="grow">
          <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
            {isFetching
              ? skeletons
              : movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
          </div>
        </div>
        {details && <MovieDetails />}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
}
