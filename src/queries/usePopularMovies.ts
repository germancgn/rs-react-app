import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { delay } from '../utils/async/delay';
import { useLocale } from 'next-intl';

export function usePopularMovies(
  page = 1,
  initialData: MovieResponse,
  initialPage: number
) {
  const locale = useLocale();

  return useQuery<MovieResponse>({
    queryKey: ['popularMovies', locale, page],
    queryFn: () => delay(() => fetchPopularMovies(page, locale), 250),
    initialData: page === initialPage ? initialData : undefined,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
