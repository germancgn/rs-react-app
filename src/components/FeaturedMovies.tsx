import { Component } from 'react';
import type { Movie } from '../types/movies/Movie';
import { fetchPopularMovies } from '../services/movie-service';
import MovieCard from './MovieCard';

type FeaturedMoviesProps = Record<string, never>;
type FeaturedMoviesState = {
  movies: Movie[];
};

export default class FeaturedMovies extends Component<
  FeaturedMoviesProps,
  FeaturedMoviesState
> {
  constructor(props: FeaturedMoviesProps) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount(): void {
    fetchPopularMovies().then((data) =>
      this.setState({
        movies: data.results,
      })
    );
  }

  render() {
    return (
      <>
        <h2>Featured Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {this.state.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </>
    );
  }
}
