'use client';

import MoviesList from './MoviesList';
import { useSearchMovies } from '../../queries/useSearchMovies';
import MovieListError from './MovieListError';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchMoviesContainerProps = {
  searchTerm: string;
};

export default function SearchMoviesContainer({
  searchTerm,
}: SearchMoviesContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchPage = Number(searchParams.get('searchPage') ?? 1);

  const { data, isFetching, refetch, error } = useSearchMovies(
    searchTerm,
    searchPage
  );

  const results = data?.results ?? [];
  const total_pages = data?.total_pages ?? 0;

  const setPage = (next: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('searchPage', String(Math.max(1, next)));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (error) return <MovieListError error={error} onRetry={() => refetch()} />;

  return (
    <MoviesList
      movies={results}
      isFetching={isFetching}
      title="Search Results"
      totalPages={total_pages}
      page={searchPage}
      onNextPage={() => setPage(Math.min(searchPage + 1, total_pages))}
      onPrevPage={() => setPage(Math.max(searchPage - 1, 1))}
      onReload={() => refetch()}
    />
  );
}
