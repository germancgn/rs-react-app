import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { delay } from '../utils/async/delay';
import { useQuerySettings } from '../stores/queryStore';

export function usePopularMovies(page = 1) {
  const querySettings = useQuerySettings();
  return useQuery<MovieResponse>({
    queryKey: ['popularMovies', page],
    queryFn: () => delay(() => fetchPopularMovies(page), 250),
    staleTime: querySettings.staleTime,
    gcTime: querySettings.gcTime,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
