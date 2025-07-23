import type { Movie } from '../types/movies/Movie';

type MovieCardProps = {
  movie: Movie;
  onHover: () => void;
};

export default function FeaturedMovieCard({ movie, onHover }: MovieCardProps) {
  return (
    <div
      className="rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:border-pink-500 hover:shadow-pink-500 hover:cursor-pointer hover:scale-110 transition-all"
      data-testid="movie-card-featured"
      onMouseEnter={onHover}
    >
      <img
        src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
}
