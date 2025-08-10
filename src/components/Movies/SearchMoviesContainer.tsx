import MoviesList from './MoviesList';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../../queries/useSearchMovies';
import MovieListError from './MovieListError';

type SearchMoviesContainerProps = {
  searchTerm: string;
};

export default function SearchMoviesContainer({
  searchTerm,
}: SearchMoviesContainerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = Number(searchParams.get('searchPage')) || 1;
  const { data, isFetching, refetch, error } = useSearchMovies(
    searchTerm,
    searchPage
  );

  const results = data?.results ?? [];
  const total_pages = data?.total_pages ?? 0;

  const setPage = (next: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('searchPage', String(Math.max(1, next)));
    setSearchParams(params, { replace: true });
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
