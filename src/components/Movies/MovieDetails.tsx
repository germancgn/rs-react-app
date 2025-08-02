import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../../services/movie-service';
import type { MovieDetails } from '../../types/movies/MovieDetails';
import { CheckCircleSolid, PlusCircle, X } from '../Shared/Icon';
import { useMovieStore } from '../../stores/movieStore';

function MovieDetailsSkeleton() {
  return (
    <div
      data-testid="movie-details-skeleton"
      className="w-full p-4 h-fit flex flex-col md:flex-row gap-8 bg-gray-900 text-white rounded-lg sticky top-4 animate-pulse"
    >
      <div className="max-w-[200px] w-full aspect-2/3 bg-gray-700 rounded-lg" />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="h-8 w-2/3 bg-gray-700 rounded" />
          <div className="h-8 w-8 bg-gray-700 rounded-full" />
        </div>
        <div className="h-4 w-1/2 bg-gray-600 rounded" />
        <div className="h-20 w-full bg-gray-700 rounded" />
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <div className="h-4 w-24 bg-gray-600 rounded" />
          <div className="h-4 w-24 bg-gray-600 rounded" />
          <div className="h-4 w-32 bg-gray-600 rounded" />
          <div className="h-4 w-20 bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function MovieDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const { add, remove, hasItem } = useMovieStore();

  useEffect(() => {
    if (!params.id) return;
    let isCancelled = false;
    setIsLoading(true);

    getMovieById(params.id)
      .then((data) => {
        if (!isCancelled) {
          setMovieDetails(data);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [params.id]);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  return (
    !isLoading &&
    movieDetails && (
      <div className="flex flex-col">
        <div className="max-w-fit p-4 h-fit flex flex-col md:flex-row gap-8 bg-gray-900 text-white rounded-lg sticky top-4">
          <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : '/images/image-not-found.jpg'
            }
            alt={movieDetails.title || 'Movie Poster'}
            className="max-w-[200px] aspect-2/3 rounded-lg object-cover"
          />
          <div className="flex flex-col justify-around gap-4">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
                <button
                  onClick={() => navigate('/')}
                  aria-label="Close"
                  className=" text-gray-400 hover:text-white transition cursor-pointer p-2 rounded-full hover:bg-white/10"
                >
                  <span>
                    <X size={24} />
                  </span>
                </button>
              </div>
              {movieDetails.tagline ? (
                <p className="italic text-gray-400">{movieDetails.tagline}</p>
              ) : (
                <p className="italic text-gray-600">No tagline available</p>
              )}
              <p>{movieDetails.overview || 'No overview available.'}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span>
                  <strong>Release:</strong> {movieDetails.release_date || 'N/A'}
                </span>
                <span>
                  <strong>Runtime:</strong>{' '}
                  {movieDetails.runtime ? `${movieDetails.runtime} min` : 'N/A'}
                </span>
                <span data-testid="movie-details-genres">
                  <strong>Genres:</strong>{' '}
                  {movieDetails.genres && movieDetails.genres.length > 0
                    ? movieDetails.genres.map((g) => g.name).join(', ')
                    : 'N/A'}
                </span>
                <span data-testid="movie-details-rating">
                  <strong>Rating:</strong>{' '}
                  {movieDetails.vote_average
                    ? `${movieDetails.vote_average} / 10`
                    : 'N/A'}
                </span>
              </div>
            </div>
            <div className="self-end">
              {hasItem(movieDetails.id) ? (
                <button
                  onClick={() => remove(movieDetails.id)}
                  className="flex items-center gap-2 py-2 px-4 text-sm rounded-full border border-sky-500 hover:bg-sky-400 cursor-pointer bg-sky-500"
                >
                  <span>Selected</span>
                  <span>
                    <CheckCircleSolid size={18} />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    add({ ...movieDetails, media_type: 'movie', genre_ids: [] })
                  }
                  className="flex items-center gap-2 py-2 px-4 text-sm rounded-full border border-gray-500 hover:border-gray-400 cursor-pointer"
                >
                  <span>Select movie</span>
                  <span>
                    <PlusCircle size={18} />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
