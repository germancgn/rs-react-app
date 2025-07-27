import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { mockMovies } from '../../__mocks__/movies';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

const mockMovie = mockMovies[0];

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

vi.mock('../../services/movie-service', () => ({
  getMovieById: vi.fn(() =>
    Promise.resolve({
      ...mockMovie,
    })
  ),
}));

import MovieDetails from './MovieDetails';

describe('MovieDetails', () => {
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
      {
        timeout: 1000,
      }
    );
  });
});
