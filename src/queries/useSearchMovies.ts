import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { useLocale } from 'next-intl';

export function useSearchMovies(searchTerm: string, page = 1) {
  const locale = useLocale();

  return useQuery<MovieResponse>({
    queryKey: ['searchMovies', locale, searchTerm, page],
    queryFn: () => searchMovies(searchTerm, page, locale),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
