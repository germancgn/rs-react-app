import { Link } from 'react-router-dom';
import { useMovieStore } from '../../stores/movieStore';
import type { Movie } from '../../types/movies/Movie';
import { CheckCircleSolid, PlusCircle } from '../Shared/Icon';

type MovieCardProps = {
  movie: Movie;
  onHover: () => void;
};

export default function FeaturedMovieCard({ movie, onHover }: MovieCardProps) {
  const { add, remove, hasItem } = useMovieStore();

  return (
    <div
      className="relative group flex-shrink-0 max-w-[200px] rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:border-pink-500 hover:shadow-pink-500 hover:cursor-pointer hover:scale-110 transition-all"
      data-testid="movie-card-featured"
      onMouseEnter={onHover}
    >
      <div className="absolute top-2 right-2 p-4 flex items-center justify-center z-50">
        {hasItem(movie.id) ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              remove(movie.id);
            }}
            className="cursor-pointer transition rounded-full text-blue-400 hover:text-blue-500 bg-white"
          >
            <CheckCircleSolid size={24} />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              add(movie);
            }}
            className="cursor-pointer transition rounded-full text-white opacity-0 group-hover:opacity-100"
          >
            <PlusCircle size={24} />
          </button>
        )}
      </div>
      <Link to={`/details/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded-xl brightness-100 group-hover:brightness-85 transition"
        />
      </Link>
    </div>
  );
}
