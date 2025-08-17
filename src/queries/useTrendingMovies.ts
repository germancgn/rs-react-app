import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { trendingMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { delay } from '../utils/async/delay';
import { useLocale } from 'next-intl';

export function useTrendingMovies(page = 1) {
  const locale = useLocale();
  console.log({ locale });
  return useQuery<MovieResponse>({
    queryKey: ['trendingMovies', locale, page],
    queryFn: () => delay(() => trendingMovies(page, locale), 250),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
