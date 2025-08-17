import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovieById } from '../services/movie-service';
import { delay } from '../utils/async/delay';

import type { MovieDetails } from '../types/movies/MovieDetails';
import { useLocale } from 'next-intl';

export function useGetMovieById(id: string) {
  const locale = useLocale();

  return useQuery<MovieDetails>({
    queryKey: ['getMovieById', locale, id],
    queryFn: () => delay(() => getMovieById(id, locale), 250),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
