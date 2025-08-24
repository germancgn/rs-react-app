import { describe, it, expect, beforeEach } from 'vitest';
import { SelectedMoviesBar } from './SelectedMoviesBar';
import { useMovieStore } from '../../stores/movieStore';
import { cleanup, screen } from '@testing-library/react';
import { mockMovies } from '../../__mocks__/movies';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

beforeEach(() => {
  cleanup();
  useMovieStore.getState().clear();
});

describe('SelectedMoviesBar', () => {
  it('should display correct number of selected movies', () => {
    const movies = mockMovies.slice(0, 3);
    movies.forEach((movie) => useMovieStore.getState().add(movie));

    renderWithProviders(<SelectedMoviesBar />);

    movies.forEach((movie) => {
      const movieItem = screen.getByText(movie.title);
      expect(movieItem).toBeInTheDocument();
    });
  });

  it('clears the store when user clicks unselect button', async () => {
    const movies = mockMovies.slice(0, 3);
    movies.forEach((movie) => useMovieStore.getState().add(movie));

    renderWithProviders(<SelectedMoviesBar />);

    const unselectBtn = screen.getByTestId('button-unselect');
    await userEvent.click(unselectBtn);
    expect(useMovieStore.getState().selected.length).toBe(0);
  });
});
