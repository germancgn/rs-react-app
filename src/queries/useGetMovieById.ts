import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovieById } from '../services/movie-service';
import { delay } from '../utils/async/delay';
import { useQuerySettings } from '../stores/queryStore';
import type { MovieDetails } from '../types/movies/MovieDetails';

export function useGetMovieById(id: string) {
  const querySettings = useQuerySettings();
  return useQuery<MovieDetails>({
    queryKey: ['getMovieById', id],
    queryFn: () => delay(() => getMovieById(id), 250),
    staleTime: querySettings.staleTime,
    gcTime: querySettings.gcTime,
    placeholderData: keepPreviousData,
  });
}
