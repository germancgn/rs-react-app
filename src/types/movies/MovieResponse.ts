import type { Movie } from './Movie';

export type MovieResponse = {
  page: number;
  total_pages: number;
  results: Movie[];
};
