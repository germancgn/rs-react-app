import { Outlet } from 'react-router-dom';
import type { Movie } from '../../types/movies/Movie';
import { Pagination } from '../Shared/Pagination';
import MovieCard from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

function MovieGrid({
  movies,
  isLoading,
}: {
  movies: Movie[];
  isLoading: boolean;
}) {
  return (
    <div className="flex gap-4 relative">
      <div className="grow">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

type MoviesListProps = {
  title: string;
  movies: Movie[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export default function MoviesList({
  title,
  movies,
  isLoading,
  page,
  totalPages,
  onNextPage,
  onPrevPage,
}: MoviesListProps) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl text-white font-bold mb-4">{title}</h2>
      <MovieGrid movies={movies} isLoading={isLoading} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />
    </div>
  );
}
