import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { trendingMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { delay } from '../utils/async/delay';

export function useTrendingMovies(page = 1) {
  return useQuery<MovieResponse>({
    queryKey: ['trendingMovies', page],
    queryFn: () => delay(() => trendingMovies(page), 250),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
