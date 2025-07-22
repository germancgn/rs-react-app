import type { Movie } from '../types/movies/Movie';
import { getGenreNameById } from '../utils/genreUtils';
import * as Icon from './Icon';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const genres = movie.genre_ids
    .map((id) => getGenreNameById(id))
    .filter(Boolean);

  return (
    <div
      className="rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:border-pink-500 hover:shadow-pink-500 hover:cursor-pointer transition-all"
      data-testid="movie-card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate block mb-2">
          {movie.title}
        </h3>
        <div className="flex gap-2 items-center">
          <span className="text-yellow-400">
            <Icon.StarSolid size={16} />
          </span>
          <span className="text-base font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-sm font-semibold text-gray-400 truncate max-w-full">
            {genres.join(' • ')}
          </span>
        </div>
      </div>
    </div>
  );
}
