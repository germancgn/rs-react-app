import { Link, useLocation } from 'react-router-dom';
import type { Movie } from '../../types/movies/Movie';
import { getGenreNameById } from '../../utils/movies/genreUtils';
import { CheckCircleSolid, PlusCircle, StarSolid } from '../Shared/Icon';
import { useMovieStore } from '../../stores/movieStore';
import { useMemo } from 'react';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const location = useLocation();
  const { hasItem, add, remove } = useMovieStore();
  const genres = useMemo(() => {
    if (!movie.genre_ids) return [];
    return movie.genre_ids.map((id) => getGenreNameById(id)).filter(Boolean);
  }, [movie.genre_ids]);

  return (
    <div
      className="group relative rounded-2xl max-w-[250px] border bg-white dark:bg-transparent border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:border-pink-500 hover:shadow-pink-500 hover:cursor-pointer transition-all p-2 md:p-4"
      data-testid="movie-card"
    >
      <div className="absolute top-2 right-2 p-4 flex items-center justify-center z-10">
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
      <Link
        to={{ pathname: `/details/${movie.id}`, search: location.search }}
        state={{ from: location }}
      >
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
            {movie.title}
          </h3>
          <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400">
            <span className="text-yellow-400">
              <StarSolid size={16} />
            </span>
            <span className="text-base font-semibold ">
              {movie?.vote_average?.toFixed(1)}
            </span>
            <span className="text-sm font-semibold truncate max-w-full">
              {genres.join(' • ')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
