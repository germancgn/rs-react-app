import type { Movie } from '../../types/movies/Movie';
import MovieCard from './MovieCard';

type MoviesListProps = {
  movies: Movie[];
};

export default function MoviesList({ movies }: MoviesListProps) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
