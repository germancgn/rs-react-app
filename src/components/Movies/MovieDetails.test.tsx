import * as movieService from '../../services/movie-service';
import { describe, it, vi, beforeEach, expect, afterAll } from 'vitest';
import { cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { fantasticFourDetailsMock } from '../../__mocks__/movies';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import MovieDetails from './MovieDetails';

afterAll(() => {
  vi.resetAllMocks();
});

vi.mock('../../services/movie-service', () => {
  return {
    getMovieById: vi.fn(),
  };
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

describe('MovieDetails', () => {
  it('renders movie details after data is loaded', async () => {
    vi.spyOn(movieService, 'getMovieById').mockImplementation(() => {
      return Promise.resolve({
        ...fantasticFourDetailsMock,
      });
    });

    renderWithProviders(<MovieDetails />);

    expect(screen.getByTestId('movie-details-skeleton')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: fantasticFourDetailsMock.title })
      ).toBeInTheDocument();

      expect(
        screen.getByText(fantasticFourDetailsMock.overview as string)
      ).toBeInTheDocument();

      expect(
        screen.getByText(fantasticFourDetailsMock.release_date)
      ).toBeInTheDocument();

      expect(
        screen.getByText(`${fantasticFourDetailsMock.vote_average} / 10`)
      ).toBeInTheDocument();

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute(
        'src',
        expect.stringContaining(
          encodeURIComponent(fantasticFourDetailsMock.poster_path as string)
        )
      );
      expect(image).toHaveAttribute('alt', fantasticFourDetailsMock.title);
    });
  });

  it('renders fallback text when movie fields are null or empty', async () => {
    vi.spyOn(movieService, 'getMovieById').mockImplementation(() => {
      return Promise.resolve({
        ...fantasticFourDetailsMock,
        poster_path: null,
        tagline: null,
        overview: '',
        genres: [],
        vote_average: 0,
      });
    });

    renderWithProviders(<MovieDetails />);

    await waitFor(() => {
      const poster = screen.getByRole('img', {
        name: fantasticFourDetailsMock.title,
      });
      expect(poster).toHaveAttribute(
        'src',
        expect.stringContaining(
          encodeURIComponent('/images/image-not-found.jpg')
        )
      );
      expect(screen.getByText(/No tagline available/i)).toBeInTheDocument();
      expect(screen.getByText(/No overview available/i)).toBeInTheDocument();
      expect(screen.getByTestId('movie-details-genres')).toHaveTextContent(
        'Genres: N/A'
      );
      expect(screen.getByTestId('movie-details-rating')).toHaveTextContent(
        'Rating: N/A'
      );
    });
  });
});
