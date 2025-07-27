import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import FeaturedMovieCard from './FeaturedMovieCard';
import { mockMovies } from '../../__mocks__/movies';

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
      `https://image.tmdb.org/t/p/w780/${mockMovie.poster_path}`
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
});
