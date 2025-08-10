import { it, expect, describe, afterEach, vi } from 'vitest';
import MoviesList from './MoviesList';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../../__mocks__/movies';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

afterEach(() => {
  cleanup();
});

describe('MoviesList', () => {
  it('passes the correct props to each MovieCard', () => {
    renderWithProviders(
      <MemoryRouter>
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
      </MemoryRouter>
    );

    mockMovies.forEach((movie) => {
      const movieCard = screen.getByText(movie.title);
      expect(movieCard).toBeInTheDocument();
    });
  });

  it('renders the correct number of MovieCard components', () => {
    renderWithProviders(
      <MemoryRouter>
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
      </MemoryRouter>
    );

    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it('renders all MovieCard components in the document', () => {
    renderWithProviders(
      <MemoryRouter>
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
      </MemoryRouter>
    );
    mockMovies.forEach((movie) => {
      const movieCard = screen.getByText(movie.title);
      expect(movieCard).toBeInTheDocument();
    });
  });
});
