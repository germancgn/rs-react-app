import { Component } from 'react';
import type { Movie } from '../types/movies/Movie';

type MovieCardProps = {
  movie: Movie;
};

export default class MovieCard extends Component<MovieCardProps> {
  render() {
    const movie = this.props.movie;
    return (
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          alt=""
        />
        <h3>{movie.title}</h3>
      </div>
    );
  }
}
