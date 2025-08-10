import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovieById } from '../services/movie-service';
import { delay } from '../utils/async/delay';

import type { MovieDetails } from '../types/movies/MovieDetails';

export function useGetMovieById(id: string) {
  return useQuery<MovieDetails>({
    queryKey: ['getMovieById', id],
    queryFn: () => delay(() => getMovieById(id), 250),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
