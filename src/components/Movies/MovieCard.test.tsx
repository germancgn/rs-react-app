import { it, describe, afterEach, vi, beforeEach, expect } from 'vitest';

import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../../__mocks__/movies';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import MovieCard from './MovieCard';

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

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

const movie = mockMovies[0];

describe('MovieCard', async () => {
  it('renders the movie with the title as a heading', () => {
    renderWithProviders(<MovieCard movie={movie} />);

    const heading = screen.getByRole('heading', {
      name: new RegExp(movie.title),
    });
    expect(heading).toBeInTheDocument();
  });
  it('renders the movie poster image', () => {
    renderWithProviders(<MovieCard movie={movie} />);
    const posterImage = screen.getByRole('img', {
      name: new RegExp(movie.title),
    });

    expect(posterImage).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent(movie.poster_path as string))
    );
  });
  it('renders fallback image when poster_path is not provided', () => {
    const movieWithoutPoster = { ...movie, poster_path: null };
    renderWithProviders(<MovieCard movie={movieWithoutPoster} />);
    const posterImage = screen.getByRole('img', {
      name: new RegExp(movie.title),
    });

    expect(posterImage).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent('/images/image-not-found.jpg'))
    );
  });
});
