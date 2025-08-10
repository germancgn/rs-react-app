import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/movie-service';
import { type MovieResponse } from '../types/movies/MovieResponse';
import { delay } from '../utils/async/delay';

export function useSearchMovies(searchTerm: string, page = 1) {
  return useQuery<MovieResponse>({
    queryKey: ['searchMovies', searchTerm, page],
    queryFn: () => delay(() => searchMovies(searchTerm, page), 250),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: page > 0,
  });
}
