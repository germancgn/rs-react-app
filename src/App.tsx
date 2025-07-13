import { Component } from 'react';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { type Movie } from './types/movies/Movie';
import { fetchPopularMovies, searchMovies } from './services/movie-service';
import MoviesList from './components/MoviesList';

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

  componentDidMount(): void {
    this.setState({ isLoading: true });
    fetchPopularMovies()
      .then((data) => this.setState({ movies: data.results }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    if (!trimmedTerm) return;

    localStorage.setItem('searchItem', trimmedTerm);

    this.setState({
      isLoading: true,
    });

    // setTimeout is used to simulate a slow connection
    setTimeout(() => {
      searchMovies(trimmedTerm)
        .then((data) => {
          this.setState({ movies: data.results });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }, 1000);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  fetchWrongData = () => {
    this.setState({
      movies: {} as Movie[],
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
            isLoading={this.state.isLoading}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={this.fetchWrongData}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 shadow-md transition-all hover:cursor-pointer"
            >
              Fetch WRONG data
            </button>
          </div>
          {this.state.isLoading ? (
            <div>loading</div>
          ) : (
            <ErrorBoundary>
              <MoviesList movies={this.state.movies} />
            </ErrorBoundary>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}
