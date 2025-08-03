import { useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { fetchPopularMovies, searchMovies } from '../services/movie-service';
import MoviesList from '../components/Movies/MoviesList';
import { useSearch } from '../hooks/useSearch';
import type { MovieResponse } from '../types/movies/MovieResponse';
import { SelectedMoviesBar } from '../components/Movies/SelectedMoviesBar';

type MovieCategoryState = {
  response: MovieResponse | null;
  page: number;
  isLoading: boolean;
};

type AppState = {
  [category: string]: MovieCategoryState;
};

const initialState: AppState = {
  popular: { response: null, page: 1, isLoading: false },
  search: { response: null, page: 1, isLoading: false },
};

type Action =
  | { type: 'NEXT_PAGE'; payload: { category: string } }
  | { type: 'PREV_PAGE'; payload: { category: string } }
  | { type: 'SET_PAGE'; payload: { category: string; page: number } }
  | { type: 'SET_LOADING'; payload: { category: string; isLoading: boolean } }
  | {
      type: 'SET_RESPONSE';
      payload: { category: string; response: MovieResponse | null };
    };

function movieReducer(state: AppState, action: Action): AppState {
  const { category } = action.payload;
  const categoryState = state[category];

  if (!categoryState) {
    return state;
  }

  switch (action.type) {
    case 'NEXT_PAGE': {
      const totalPages = categoryState.response?.total_pages || 1;
      return {
        ...state,
        [category]: {
          ...categoryState,
          page:
            categoryState.page >= totalPages
              ? categoryState.page
              : categoryState.page + 1,
        },
      };
    }
    case 'PREV_PAGE': {
      return {
        ...state,
        [category]: {
          ...categoryState,
          page: categoryState.page <= 1 ? 1 : categoryState.page - 1,
        },
      };
    }
    case 'SET_PAGE': {
      return {
        ...state,
        [category]: {
          ...categoryState,
          page: action.payload.page,
        },
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        [category]: {
          ...categoryState,
          isLoading: action.payload.isLoading,
        },
      };
    }
    case 'SET_RESPONSE': {
      return {
        ...state,
        [category]: {
          ...categoryState,
          response: action.payload.response,
        },
      };
    }
    default:
      return state;
  }
}

export default function App() {
  const [searchTerm, setSearchTerm] = useSearch('searchTerm', '');
  const [activeSearchTerm, setActiveSearchTerm] = useState(searchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(movieReducer, initialState);

  const { popular: popularState, search: searchState } = state;

  useEffect(() => {
    const popularPageFromUrl = Number(searchParams.get('popularPage')) || 1;
    const searchPageFromUrl = Number(searchParams.get('searchPage')) || 1;

    dispatch({
      type: 'SET_PAGE',
      payload: { category: 'popular', page: popularPageFromUrl },
    });
    dispatch({
      type: 'SET_PAGE',
      payload: { category: 'search', page: searchPageFromUrl },
    });
  }, [searchParams]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set('popularPage', String(popularState.page));
    if (activeSearchTerm.trim()) {
      newParams.set('searchPage', String(searchState.page));
    }
    setSearchParams(newParams, { replace: true });
  }, [popularState.page, searchState.page, activeSearchTerm, setSearchParams]);

  useEffect(() => {
    if (!activeSearchTerm.trim()) {
      dispatch({
        type: 'SET_LOADING',
        payload: { category: 'popular', isLoading: true },
      });
      fetchPopularMovies(popularState.page)
        .then((data) => {
          dispatch({
            type: 'SET_RESPONSE',
            payload: { category: 'popular', response: data },
          });
        })
        .finally(() =>
          dispatch({
            type: 'SET_LOADING',
            payload: { category: 'popular', isLoading: false },
          })
        );
    }
  }, [activeSearchTerm, popularState.page]);

  useEffect(() => {
    const trimmedTerm = activeSearchTerm.trim();
    if (trimmedTerm) {
      dispatch({
        type: 'SET_LOADING',
        payload: { category: 'search', isLoading: true },
      });
      searchMovies(trimmedTerm, searchState.page)
        .then((data) => {
          dispatch({
            type: 'SET_RESPONSE',
            payload: { category: 'search', response: data },
          });
        })
        .finally(() => {
          dispatch({
            type: 'SET_LOADING',
            payload: { category: 'search', isLoading: false },
          });
        });
    }
  }, [activeSearchTerm, searchState.page]);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;
    dispatch({ type: 'SET_PAGE', payload: { category: 'search', page: 1 } });
    setActiveSearchTerm(trimmedTerm);
    setSearchTerm(trimmedTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchTerm('');
    setActiveSearchTerm('');
    dispatch({
      type: 'SET_RESPONSE',
      payload: { category: 'search', response: null },
    });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen mx-auto bg-gray-200 dark:bg-gradient-to-b from-[#07070D] to-[#07070D] text-gray-300">
        <Header
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          searchTerm={searchTerm}
          isLoading={searchState.isLoading}
          onClearInput={handleClearSearchInput}
        />
        <ErrorBoundary>
          {activeSearchTerm.trim() &&
          searchState.response &&
          searchState.response.results.length > 0 ? (
            <MoviesList
              movies={searchState.response.results}
              isLoading={searchState.isLoading}
              title="Search results"
              totalPages={searchState.response.total_pages}
              page={searchState.page}
              onNextPage={() =>
                dispatch({ type: 'NEXT_PAGE', payload: { category: 'search' } })
              }
              onPrevPage={() =>
                dispatch({ type: 'PREV_PAGE', payload: { category: 'search' } })
              }
            />
          ) : (
            popularState.response && (
              <MoviesList
                movies={popularState.response.results}
                isLoading={popularState.isLoading}
                title="Popular movies"
                totalPages={popularState.response.total_pages}
                page={popularState.page}
                onNextPage={() =>
                  dispatch({
                    type: 'NEXT_PAGE',
                    payload: { category: 'popular' },
                  })
                }
                onPrevPage={() =>
                  dispatch({
                    type: 'PREV_PAGE',
                    payload: { category: 'popular' },
                  })
                }
              />
            )
          )}
        </ErrorBoundary>
        <SelectedMoviesBar />
      </div>
    </ErrorBoundary>
  );
}
