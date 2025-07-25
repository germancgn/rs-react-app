import { it, expect, describe, afterEach, vi } from 'vitest';
import MoviesList from './MoviesList';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../../../__mocks__/movies';

afterEach(() => {
  cleanup();
});

describe('MoviesList', () => {
  it('passes the correct props to each MovieCard', () => {
    render(
      <MoviesList
        movies={mockMovies}
        isLoading={false}
        title=""
        totalPages={1}
        page={1}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
      />
    );

    mockMovies.forEach((movie) => {
      const movieCard = screen.getByText(movie.title);
      expect(movieCard).toBeInTheDocument();
    });
  });

  it('renders the correct number of MovieCard components', () => {
    render(
      <MoviesList
        movies={mockMovies}
        isLoading={false}
        title=""
        totalPages={1}
        page={1}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
      />
    );

    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it('renders all MovieCard components in the document', () => {
    render(
      <MoviesList
        movies={mockMovies}
        isLoading={false}
        title=""
        totalPages={1}
        page={1}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
      />
    );
    mockMovies.forEach((movie) => {
      const movieCard = screen.getByText(movie.title);
      expect(movieCard).toBeInTheDocument();
    });
  });
});
