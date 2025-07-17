import { it, expect, describe, afterEach } from 'vitest';
import MovieCard from '../../src/components/MovieCard';
import { cleanup, render, screen } from '@testing-library/react';
import type { Movie } from '../../src/types/movies/Movie';
import '@testing-library/jest-dom/vitest';

const movie: Movie = {
  adult: false,
  backdrop_path: '/path-to-backdrop.jpg',
  id: 1,
  title: 'Batman Begins',
  original_title: 'Batman Begins',
  overview:
    'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City.',
  poster_path: '/path-to-poster.jpg',
  media_type: 'movie',
  original_language: 'en',
  genre_ids: [28, 80],
  popularity: 82.345,
  release_date: '2005-06-15',
  video: false,
  vote_average: 8.2,
  vote_count: 21000,
};

afterEach(() => {
  cleanup();
});

describe('MovieCard', () => {
  it('renders the movie with the title as a heading', () => {
    render(<MovieCard movie={movie} />);
    const heading = screen.getByRole('heading', { name: /Batman Begins/i });
    expect(heading).toBeInTheDocument();
  });

  it("shows 'unknown' year when release_date is missing", () => {
    const movieWithoutReleaseDate = { ...movie, release_date: '' };

    render(<MovieCard movie={movieWithoutReleaseDate} />);

    const yearText = screen.getByText(/unknown/i);
    expect(yearText).toBeInTheDocument();
  });

  it('renders the movie poster image', () => {
    render(<MovieCard movie={movie} />);
    const posterImage = screen.getByRole('img', {
      name: new RegExp(movie.title),
    });
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
    );
  });
});
