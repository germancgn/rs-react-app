import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovieById } from '../services/movie-service';

import type { MovieDetails } from '../types/movies/MovieDetails';
import { useLocale } from 'next-intl';

export function useGetMovieById(id: string) {
  const locale = useLocale();

  return useQuery<MovieDetails>({
    queryKey: ['getMovieById', locale, id],
    queryFn: () => getMovieById(id, locale),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
