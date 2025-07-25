import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchPopularMovies, searchMovies } from './services/movie-service';
import MoviesList from './components/Movies/MoviesList';
import { useSearch } from './hooks/useSearch';
import type { MovieResponse } from './types/movies/MovieResponse';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [popularMovies, setPopularMovies] = useState<MovieResponse>();
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [moviesSearchResults, setMoviesSearchResults] =
    useState<MovieResponse>();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useSearch('searchTerm', '');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchPage, setSearchPage] = useState(() =>
    parseInt(searchParams.get('searchPage') || '1', 10)
  );
  const [popularPage, setPopularPage] = useState(() =>
    parseInt(searchParams.get('popularPage') || '1', 10)
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setShowSearchResults(false);
      setIsLoadingPopular(true);
      fetchPopularMovies(popularPage)
        .then((data) => setPopularMovies(data))
        .finally(() => setIsLoadingPopular(false));
    }
  }, [searchTerm, popularPage]);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    setSearchPage(1);
    setShowSearchResults(true);
    setSearchTerm(trimmedTerm);
    setIsLoadingSearch(true);

    searchMovies(trimmedTerm, searchPage)
      .then((data) => {
        setMoviesSearchResults(data);
      })
      .finally(() => {
        setIsLoadingSearch(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchPage(1);
    setSearchTerm('');
  };

  const handleNextPage = () => {
    if (showSearchResults) {
      if (searchPage < (moviesSearchResults?.total_pages || 1)) {
        const nextPage = searchPage + 1;
        setSearchPage(nextPage);
        setSearchParams({ searchPage: nextPage.toString() });
        setIsLoadingSearch(true);
        searchMovies(searchTerm, nextPage)
          .then((data) => setMoviesSearchResults(data))
          .finally(() => setIsLoadingSearch(false));
      }
    } else {
      if (popularPage < (popularMovies?.total_pages || 1)) {
        const nextPage = popularPage + 1;
        setPopularPage(nextPage);
        setSearchParams({ popularPage: nextPage.toString() });
        setIsLoadingPopular(true);
        fetchPopularMovies(nextPage)
          .then((data) => setPopularMovies(data))
          .finally(() => setIsLoadingPopular(false));
      }
    }
  };

  const handlePrevPage = () => {
    if (showSearchResults) {
      if (searchPage > 1) {
        const prevPage = searchPage - 1;
        setSearchPage(prevPage);
        setSearchParams({ searchPage: prevPage.toString() });
        setIsLoadingSearch(true);
        searchMovies(searchTerm, prevPage)
          .then((data) => setMoviesSearchResults(data))
          .finally(() => setIsLoadingSearch(false));
      }
    } else {
      if (popularPage > 1) {
        const prevPage = popularPage - 1;
        setPopularPage(prevPage);
        setSearchParams({ popularPage: prevPage.toString() });
        setIsLoadingPopular(true);
        fetchPopularMovies(prevPage)
          .then((data) => setPopularMovies(data))
          .finally(() => setIsLoadingPopular(false));
      }
    }
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
          {showSearchResults && searchTerm.trim() && moviesSearchResults ? (
            <MoviesList
              movies={moviesSearchResults.results}
              isLoading={isLoadingSearch}
              title="Search results"
              totalPages={moviesSearchResults.total_pages}
              page={searchPage}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          ) : (
            popularMovies && (
              <MoviesList
                movies={popularMovies.results}
                isLoading={isLoadingPopular}
                title="Popular movies"
                totalPages={popularMovies.total_pages}
                page={popularPage}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            )
          )}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
