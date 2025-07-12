import { Component } from 'react';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { type Movie } from './types/movies/Movie';
import { searchMovies } from './services/movie-service';
import FeaturedMovies from './components/FeaturedMovies';
import MovieCard from './components/MovieCard';

type AppProps = Record<string, never>;
type AppState = {
  movies: Movie[];
  isLoading: boolean;
  searchTerm: string;
};

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      searchTerm: localStorage.getItem('searchItem') ?? '',
    };
  }

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    if (!trimmedTerm) return;

    localStorage.setItem('searchItem', trimmedTerm);

    this.setState({
      isLoading: true,
    });
    searchMovies(trimmedTerm)
      .then((data) =>
        this.setState({
          movies: data.results,
        })
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="min-h-screen mx-auto bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-gray-300">
          <Header
            onSearch={this.handleSearch}
            onInputChange={this.handleInputChange}
            searchTerm={this.state.searchTerm}
          />
          {this.state.movies.length > 0 ? (
            <div>
              <h2>Search Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {this.state.movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ) : (
            <FeaturedMovies />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}
