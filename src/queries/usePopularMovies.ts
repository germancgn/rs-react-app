import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { delay } from '../utils/async/delay';

export function usePopularMovies(page = 1) {
  return useQuery<MovieResponse>({
    queryKey: ['popularMovies', page],
    queryFn: () => delay(() => fetchPopularMovies(page), 250),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
