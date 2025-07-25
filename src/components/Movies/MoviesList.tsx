import type { Movie } from '../../types/movies/Movie';
import { Spinner } from '../Shared/Spinner';
import MovieCard from './MovieCard';

type MoviesListProps = {
  title: string;
  movies: Movie[];
  isLoading: boolean;
};

export default function MoviesList({
  title,
  movies,
  isLoading,
}: MoviesListProps) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl text-white font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <Spinner size={64} />
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
}
