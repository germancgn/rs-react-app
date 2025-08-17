'use client';

import MoviesList from './MoviesList';
import { usePopularMovies } from '../../queries/usePopularMovies';
import MovieListError from './MovieListError';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MovieResponse } from '../../types/movies/MovieResponse';

type PopularMoviesContainerProps = {
  initialData: MovieResponse;
  initialPage: number;
};

export default function PopularMoviesContainer({
  initialData,
  initialPage,
}: PopularMoviesContainerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('HomePage');

  const page = Number(searchParams.get('popularPage') ?? 1);

  const { data, isFetching, refetch, error } = usePopularMovies(
    page,
    initialData,
    initialPage
  );
  const results = data?.results ?? [];
  const total_pages = data?.total_pages ?? 0;

  const setPage = (next: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('popularPage', String(Math.max(1, next)));
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  };

  if (error) return <MovieListError error={error} onRetry={() => refetch()} />;

  return (
    <MoviesList
      movies={results}
      isFetching={isFetching}
      title={t('headingPopularMovies')}
      totalPages={total_pages}
      page={page}
      onNextPage={() =>
        setPage(total_pages ? Math.min(page + 1, total_pages) : page + 1)
      }
      onPrevPage={() => setPage(Math.max(page - 1, 1))}
      onReload={() => refetch()}
    />
  );
}
