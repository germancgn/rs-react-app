import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { mockMovies } from '../../__mocks__/movies';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import MovieDetails from './MovieDetails';

const mockMovie = mockMovies[0];

const { getMovieByIdMock } = vi.hoisted(() => {
  return { getMovieByIdMock: vi.fn() };
});

vi.mock('../../services/movie-service', () => ({
  getMovieById: getMovieByIdMock,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe('MovieDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getMovieByIdMock.mockResolvedValue({
      ...mockMovie,
    });
  });

  it('renders movie details after data is loaded', async () => {
    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: mockMovie.title })
        ).toBeInTheDocument();

        expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();

        expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();

        expect(
          screen.getByText(`${mockMovie.vote_average} / 10`)
        ).toBeInTheDocument();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute(
          'src',
          expect.stringContaining(mockMovie.poster_path as string)
        );
        expect(image).toHaveAttribute('alt', mockMovie.title);
      },
      { timeout: 1000 }
    );
  });

  it('renders "Movie Poster" as alt text when title is not available', async () => {
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      title: '',
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'Movie Poster');
      },
      { timeout: 1000 }
    );
  });

  it('renders "No tagline available" when tagline is not provided', async () => {
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      tagline: null,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No tagline available')).toBeInTheDocument();
    });
  });

  it('renders "N/A" for genres when no genres are available', async () => {
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      genres: [],
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const genresElement = screen.getByText((_content, element) => {
        return element?.textContent === 'Genres: N/A';
      });
      expect(genresElement).toBeInTheDocument();
    });
  });

  it('renders "N/A" for rating when vote_average is not available', async () => {
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      vote_average: 0,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const ratingElement = screen.getByText((_content, element) => {
        return element?.textContent === 'Rating: N/A';
      });
      expect(ratingElement).toBeInTheDocument();
    });
  });

  it('renders fallback image when poster_path is not available', async () => {
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      poster_path: null,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/images/image-not-found.jpg');
    });
  });

  it('navigates to home when close button is clicked', async () => {
    const navigateMock = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('renders "N/A" for runtime when runtime is not available', async () => {
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      runtime: null,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const runtimeElement = screen.getByText((_content, element) => {
        return element?.textContent === 'Runtime: N/A';
      });
      expect(runtimeElement).toBeInTheDocument();
    });
  });

  it('renders tagline when it is available', async () => {
    const tagline = 'A test tagline';
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      tagline,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(tagline)).toBeInTheDocument();
    });
  });

  it('renders genres when they are available', async () => {
    const genres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
    ];
    getMovieByIdMock.mockResolvedValueOnce({
      ...mockMovie,
      genres,
    });

    render(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      const genresElement = screen.getByText((_content, element) => {
        return element?.textContent === 'Genres: Action, Adventure';
      });
      expect(genresElement).toBeInTheDocument();
    });
  });
});
