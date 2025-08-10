import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { useSearch } from '../hooks/useSearch';
import { SelectedMoviesBar } from '../components/Movies/SelectedMoviesBar';
import PopularMoviesContainer from '../components/Movies/PopularMoviesContainer';
import SearchMoviesContainer from '../components/Movies/SearchMoviesContainer';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearch('searchTerm', '');
  const [activeSearchTerm, setActiveSearchTerm] = useState(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveSearchTerm(e.target.value);
    if (e.target.value.trim() === '') setSearchTerm('');
  };

  useEffect(() => {
    setActiveSearchTerm(searchTerm);
  }, [searchTerm]);

  const resetSearchPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('searchPage', String(1));
    setSearchParams(params, { replace: true });
  };

  const handleClearSearchInput = () => {
    setSearchTerm('');
    setActiveSearchTerm('');
    resetSearchPage();
  };

  const handleSearch = () => {
    if (!activeSearchTerm.trim()) return;
    setSearchTerm(activeSearchTerm.trim());
    resetSearchPage();
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen mx-auto bg-gray-200 dark:bg-gradient-to-b from-[#07070D] to-[#07070D] text-gray-300">
        <Header
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          searchTerm={activeSearchTerm}
          onClearInput={handleClearSearchInput}
        />
        <ErrorBoundary>
          {searchTerm ? (
            <SearchMoviesContainer searchTerm={searchTerm} />
          ) : (
            <PopularMoviesContainer />
          )}
        </ErrorBoundary>
        <SelectedMoviesBar />
      </div>
    </ErrorBoundary>
  );
}
