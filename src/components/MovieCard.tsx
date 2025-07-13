import { Component } from 'react';
import type { Movie } from '../types/movies/Movie';

type MovieCardProps = {
  movie: Movie;
};

export default class MovieCard extends Component<MovieCardProps> {
  render() {
    const movie = this.props.movie;
    return (
      <div className="rounded-lg border border-gray-700 overflow-hidden shadow-md hover:border-pink-500 hover:shadow-pink-500 hover:cursor-pointer transition-all">
        <img
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          alt=""
          className="w-full h-auto"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center mb-2">
            {movie.title}
          </h3>
          <span className="text-gray-400 text-center block">
            {extractYear(movie.release_date)}
          </span>
        </div>
      </div>
    );
  }
}

function extractYear(dateString: string) {
  if (!dateString) return 'Unknown';
  return dateString.split('-')[0];
}
