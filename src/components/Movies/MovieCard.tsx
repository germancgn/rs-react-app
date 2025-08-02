import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movies/Movie';
import { getGenreNameById } from '../../utils/genreUtils';
import { CheckCircleSolid, PlusCircle, StarSolid } from '../Shared/Icon';
import { useMovieStore } from '../../stores/movieStore';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { hasItem, add, remove } = useMovieStore();
  const genres = movie.genre_ids
    .map((id) => getGenreNameById(id))
    .filter(Boolean);

  return (
    <div
      className="group relative rounded-2xl max-w-[250px] border border-gray-700 overflow-hidden shadow-md hover:border-pink-500 hover:shadow-pink-500 hover:cursor-pointer transition-all p-4"
      data-testid="movie-card"
    >
      <div className="absolute top-2 right-2 p-4 flex items-center justify-center z-10">
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
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
              : '/images/image-not-found.jpg'
          }
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover rounded-xl brightness-100 group-hover:brightness-85 transition"
        />

        <div className="flex flex-col gap-2 pt-4 pb-2">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
          <div className="flex gap-2 items-center">
            <span className="text-yellow-400">
              <StarSolid size={16} />
            </span>
            <span className="text-base font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-gray-400 truncate max-w-full">
              {genres.join(' • ')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
