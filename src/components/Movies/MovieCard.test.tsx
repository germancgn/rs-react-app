import { it, expect, describe, afterEach } from 'vitest';
import MovieCard from './MovieCard';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../../__mocks__/movies';

afterEach(() => {
  cleanup();
});

const movie = mockMovies[0];

describe('MovieCard', () => {
  it('renders the movie with the title as a heading', () => {
    render(<MovieCard movie={movie} />);
    const heading = screen.getByRole('heading', {
      name: new RegExp(movie.title),
    });
    expect(heading).toBeInTheDocument();
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
