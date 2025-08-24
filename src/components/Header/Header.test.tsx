import { it, expect, describe, afterEach, vi } from 'vitest';
import Header from './Header';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../../__mocks__/movies';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

vi.mock('../../services/movie-service', () => ({
  trendingMovies: vi.fn(() =>
    Promise.resolve({ results: mockMovies.slice(0, 3) })
  ),
}));

vi.mock('../../i18n/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../i18n/navigation')>();
  return {
    ...actual,
    usePathname: vi.fn(),
    useRouter: vi.fn(),
    redirect: vi.fn(),
  };
});
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return {
    ...(actual as Record<string, unknown>),
    useSearchParams: vi.fn(() => {
      return {
        get: vi.fn(() => '1'),
      };
    }),
    redirect: vi.fn(),
  };
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Header', () => {
  it('displays FeaturedMovieCard components for trending movies', async () => {
    renderWithProviders(<Header movies={mockMovies.slice(0, 3)} />);

    const movieCards = await screen.findAllByTestId('movie-card-featured');

    expect(movieCards).toHaveLength(3);

    expect(screen.getByText('Trending movies')).toBeInTheDocument();
  });
});
