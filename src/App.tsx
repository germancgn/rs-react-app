import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { type Movie } from './types/movies/Movie';
import { fetchPopularMovies, searchMovies } from './services/movie-service';
import MoviesList from './components/Movies/MoviesList';
import { useSearch } from './hooks/useSearch';

export default function App() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [moviesSearchResults, setMoviesSearchResults] = useState<Movie[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useSearch('searchTerm', '');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setShowSearchResults(false);
      setIsLoadingPopular(true);
      fetchPopularMovies()
        .then((data) => setPopularMovies(data.results))
        .finally(() => setIsLoadingPopular(false));
    }
  }, [searchTerm]);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    setShowSearchResults(true);
    setSearchTerm(trimmedTerm);
    setIsLoadingSearch(true);

    searchMovies(trimmedTerm)
      .then((data) => {
        setMoviesSearchResults(data.results);
      })
      .finally(() => {
        setIsLoadingSearch(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchTerm('');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen mx-auto bg-gradient-to-b from-[#07070D] to-[#07070D] text-gray-300">
        <Header
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          searchTerm={searchTerm}
          isLoading={isLoadingSearch}
          onClearInput={handleClearSearchInput}
        />
        <ErrorBoundary>
          {showSearchResults && searchTerm.trim() ? (
            <MoviesList
              movies={moviesSearchResults}
              isLoading={isLoadingSearch}
              title="Search results"
            />
          ) : (
            <MoviesList
              movies={popularMovies}
              isLoading={isLoadingPopular}
              title="Popular movies"
            />
          )}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
