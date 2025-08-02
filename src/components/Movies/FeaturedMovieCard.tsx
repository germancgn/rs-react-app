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
      <div className="absolute top-2 right-2 flex items-center justify-center z-10">
        <label className="cursor-pointer transition">
          <input
            type="checkbox"
            checked={hasItem(movie.id)}
            onChange={(e) => {
              if (e.target.checked) {
                add(movie);
              } else {
                remove(movie.id);
              }
            }}
            className="sr-only"
          />
          {hasItem(movie.id) ? (
            <CheckCircleSolid
              size={24}
              className="bg-white text-sky-400 rounded-full"
            />
          ) : (
            <PlusCircle
              size={24}
              className="text-white opacity-0 group-hover:opacity-75 hover:opacity-100 transition duration-300"
            />
          )}
        </label>
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
