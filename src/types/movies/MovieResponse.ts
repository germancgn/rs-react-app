import type { Movie } from './Movie';

export type MovieResponse = {
  page: number;
  results: Movie[];
};
