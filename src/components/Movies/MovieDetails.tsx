import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../../services/movie-service';
import type { MovieDetails } from '../../types/movies/MovieDetails';
import { X } from '../Shared/Icon';

function MovieDetailsSkeleton() {
  return (
    <div className="w-full p-4 h-fit flex flex-col md:flex-row gap-8 bg-gray-900 text-white rounded-lg sticky top-4 animate-pulse">
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    })
      .then(() => {
        if (params.id) {
          getMovieById(params.id).then((data) => setMovieDetails(data));
        }
      })
      .finally(() => setIsLoading(false));
  }, [params]);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  return (
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
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">
                {movieDetails.title || 'No Title Available'}
              </h1>
              <button
                onClick={() => navigate('/')}
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
              <span>
                <strong>Genres:</strong>{' '}
                {movieDetails.genres && movieDetails.genres.length > 0
                  ? movieDetails.genres.map((g) => g.name).join(', ')
                  : 'N/A'}
              </span>
              <span>
                <strong>Rating:</strong>{' '}
                {movieDetails.vote_average
                  ? `${movieDetails.vote_average} / 10`
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
