import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { fetchPopularMovies, searchMovies } from '../services/movie-service';
import MoviesList from '../components/Movies/MoviesList';
import { useSearch } from '../hooks/useSearch';
import type { MovieResponse } from '../types/movies/MovieResponse';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [popularMoviesData, setPopularMoviesData] = useState<MovieResponse>();
  const [isLoadingPopularMovies, setIsLoadingPopularMovies] = useState(false);
  const [searchData, setSearchData] = useState<MovieResponse>();
  const [isLoadingSearchData, setIsLoadingSearchData] = useState(false);
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
      setIsLoadingPopularMovies(true);
      fetchPopularMovies(popularPage)
        .then((data) => setPopularMoviesData(data))
        .finally(() => setIsLoadingPopularMovies(false));
    }
  }, [searchTerm, popularPage]);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    setSearchPage(1);
    setShowSearchResults(true);
    setSearchTerm(trimmedTerm);
    setIsLoadingSearchData(true);

    searchMovies(trimmedTerm, searchPage)
      .then((data) => {
        setSearchData(data);
      })
      .finally(() => {
        setIsLoadingSearchData(false);
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
      if (searchPage < (searchData?.total_pages || 1)) {
        const nextPage = searchPage + 1;
        setSearchPage(nextPage);
        setSearchParams({ searchPage: nextPage.toString() });
        setIsLoadingSearchData(true);
        searchMovies(searchTerm, nextPage)
          .then((data) => setSearchData(data))
          .finally(() => setIsLoadingSearchData(false));
      }
    } else {
      if (popularPage < (popularMoviesData?.total_pages || 1)) {
        const nextPage = popularPage + 1;
        setPopularPage(nextPage);
        setSearchParams({ popularPage: nextPage.toString() });
        setIsLoadingPopularMovies(true);
        fetchPopularMovies(nextPage)
          .then((data) => setPopularMoviesData(data))
          .finally(() => setIsLoadingPopularMovies(false));
      }
    }
  };

  const handlePrevPage = () => {
    if (showSearchResults) {
      if (searchPage > 1) {
        const prevPage = searchPage - 1;
        setSearchPage(prevPage);
        setSearchParams({ searchPage: prevPage.toString() });
        setIsLoadingSearchData(true);
        searchMovies(searchTerm, prevPage)
          .then((data) => setSearchData(data))
          .finally(() => setIsLoadingSearchData(false));
      }
    } else {
      if (popularPage > 1) {
        const prevPage = popularPage - 1;
        setPopularPage(prevPage);
        setSearchParams({ popularPage: prevPage.toString() });
        setIsLoadingPopularMovies(true);
        fetchPopularMovies(prevPage)
          .then((data) => setPopularMoviesData(data))
          .finally(() => setIsLoadingPopularMovies(false));
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
          isLoading={isLoadingSearchData}
          onClearInput={handleClearSearchInput}
        />
        <ErrorBoundary>
          {showSearchResults && searchTerm.trim() && searchData ? (
            <MoviesList
              movies={searchData.results}
              isLoading={isLoadingSearchData}
              title="Search results"
              totalPages={searchData.total_pages}
              page={searchPage}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          ) : (
            popularMoviesData && (
              <MoviesList
                movies={popularMoviesData.results}
                isLoading={isLoadingPopularMovies}
                title="Popular movies"
                totalPages={popularMoviesData.total_pages}
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
