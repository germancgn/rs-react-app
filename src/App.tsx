import { useEffect, useState } from 'react';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { type Movie } from './types/movies/Movie';
import { fetchPopularMovies, searchMovies } from './services/movie-service';
import MoviesList from './components/MoviesList';
import { Spinner } from './components/Spinner';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchItem') ?? ''
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchData =
      (localStorage.getItem('searchItem') ?? '')
        ? searchMovies(localStorage.getItem('searchItem') ?? '')
        : fetchPopularMovies();

    fetchData
      .then((data) => setMovies(data.results))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    localStorage.setItem('searchItem', trimmedTerm);

    setIsLoading(true);

    searchMovies(trimmedTerm)
      .then((data) => {
        setMovies(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('searchItem', e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen mx-auto bg-gradient-to-b from-[#07070D] to-[#07070D] text-gray-300">
        <Header
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
        {isLoading ? (
          <div
            className="flex items-center justify-center h-screen"
            data-testid="loading-spinner"
          >
            <Spinner size={64} />
          </div>
        ) : (
          <ErrorBoundary>
            <MoviesList movies={movies} />
          </ErrorBoundary>
        )}
      </div>
    </ErrorBoundary>
  );
}
