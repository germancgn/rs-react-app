import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import FeaturedMovieCard from './FeaturedMovieCard';
import { mockMovies } from '../../__mocks__/movies';

import { useMovieStore } from '../../stores/movieStore';

const mockMovie = mockMovies[0];

afterEach(() => {
  cleanup();
});

describe('FeaturedMovieCard', () => {
  it('renders movie card with correct image and alt text', () => {
    const mockOnHover = vi.fn();

    render(<FeaturedMovieCard movie={mockMovie} onHover={mockOnHover} />);

    const movieCard = screen.getByTestId('movie-card-featured');
    expect(movieCard).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining(
        encodeURIComponent(mockMovie.poster_path as string)
      )
    );
    expect(image).toHaveAttribute('alt', mockMovie.title);
  });

  it('calls onHover when mouse enters the card', async () => {
    const user = userEvent.setup();
    const mockOnHover = vi.fn();

    render(<FeaturedMovieCard movie={mockMovie} onHover={mockOnHover} />);

    const movieCard = screen.getByTestId('movie-card-featured');

    await user.hover(movieCard);

    expect(mockOnHover).toHaveBeenCalledTimes(1);
  });

  it('should show check icon when movie is added to the store', () => {
    const mockOnHover = vi.fn();

    useMovieStore.getState().add(mockMovie);

    render(<FeaturedMovieCard movie={mockMovie} onHover={mockOnHover} />);

    expect(screen.getByTestId('icon-added')).toBeInTheDocument();
  });
});
