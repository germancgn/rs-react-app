import { it, describe, afterEach, expect, vi } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import MoviesList from './MoviesList';
import { mockMovies } from '../../__mocks__/movies';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

afterEach(() => {
  cleanup();
});

vi.mock('../../i18n/navigation', async () => {
  return {
    usePathname: vi.fn(),
    useRouter: vi.fn(),
  };
});

vi.mock('next/navigation', () => {
  return {
    useSearchParams: vi.fn(() => {
      return {
        get: vi.fn(() => '1'),
      };
    }),
  };
});

describe('MoviesList', () => {
  it('passes the correct props to each MovieCard', () => {
    renderWithProviders(
      <MoviesList
        movies={mockMovies}
        isFetching={false}
        title=""
        totalPages={1}
        page={1}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
        onReload={vi.fn()}
      />
    );
    mockMovies.forEach((movie) => {
      const movieCard = screen.getByText(movie.title);
      expect(movieCard).toBeInTheDocument();
    });
  });

  it('renders the correct number of MovieCard components', () => {
    renderWithProviders(
      <MoviesList
        movies={mockMovies}
        isFetching={false}
        title=""
        totalPages={1}
        page={1}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
        onReload={vi.fn()}
      />
    );
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it('renders all MovieCard components in the document', () => {
    renderWithProviders(
      <MoviesList
        movies={mockMovies}
        isFetching={false}
        title=""
        totalPages={1}
        page={1}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
        onReload={vi.fn()}
      />
    );
    mockMovies.forEach((movie) => {
      const movieCard = screen.getByText(movie.title);
      expect(movieCard).toBeInTheDocument();
    });
  });
});
