import { useEffect, useState } from 'react';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { type Movie } from './types/movies/Movie';
import { fetchPopularMovies, searchMovies } from './services/movie-service';
import MoviesList from './components/MoviesList';

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

    // setTimeout is used to simulate a slow connection
    setTimeout(() => {
      searchMovies(trimmedTerm)
        .then((data) => {
          setMovies(data.results);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('searchItem', e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen mx-auto bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-gray-300">
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
            <span className="spin-animation">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="#e94560"
                viewBox="0 0 256 256"
              >
                <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
              </svg>
            </span>
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
