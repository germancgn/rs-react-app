import { it, expect, describe, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { mockMovies } from '../__mocks__/movies';
import { searchMovies, fetchPopularMovies } from '../services/movie-service';
import App from './Home';

vi.mock('../services/movie-service', () => ({
  fetchPopularMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
  searchMovies: vi.fn(
    (movieName: string) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            results: mockMovies.filter((m) => m.title === movieName),
          });
        }, 50);
      })
  ),
  discoverMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
  trendingMovies: vi.fn(() => Promise.resolve({ results: [] })),
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

describe('App Rendering Tests', () => {
  it('renders search input and search button', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    const movieName = 'The Lord of the Rings';

    localStorage.setItem('searchTerm', movieName);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue(movieName)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search movies...')).toHaveValue(
      movieName
    );
  });

  it('shows empty input when no saved term exists', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search movies...')).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search movies...');
    const movieName = 'The Edge of Tomorrow';

    await user.type(searchInput, movieName);

    expect(searchInput).toHaveValue(movieName);
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'The Edge of Tomorrow';

    await user.type(searchInput, movieName);
    expect(searchInput).toHaveValue(movieName);

    await user.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe(movieName);
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = '   The Edge of Tomorrow   ';
    await user.type(searchInput, movieName);
    expect(searchInput).toHaveValue(movieName);
    await user.click(searchButton);
    expect(localStorage.getItem('searchTerm')).toBe(movieName.trim());
  });

  it('sets isLoading to true when search button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'The Edge of Tomorrow';

    await user.type(searchInput, movieName);
    await user.click(searchButton);

    expect(searchButton).toBeDisabled();
  });

  it('render search results when user types in a movie name and clicks search button', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'How to Train Your Dragon';

    await user.type(searchInput, movieName);
    await user.click(searchButton);

    expect(await screen.findByText(movieName)).toBeInTheDocument();
  });

  it('does not call searchMovies if searchTerm is empty or whitespace', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(searchInput, '   ');
    await user.click(searchButton);

    expect(vi.mocked(searchMovies)).not.toHaveBeenCalled();
    expect(searchButton).not.toBeDisabled();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('renders search results MoviesList with correct props when search is performed', async () => {
    const user = userEvent.setup();

    vi.mocked(searchMovies).mockResolvedValueOnce({
      results: mockMovies.slice(0, 2),
      total_pages: 5,
      page: 1,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'How to Train Your Dragon';

    await user.type(searchInput, movieName);
    await user.click(searchButton);

    expect(await screen.findByText('Search results')).toBeInTheDocument();

    expect(screen.queryByText('Popular movies')).not.toBeInTheDocument();
  });

  it('clears search input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');

    await user.type(searchInput, 'test movie');
    expect(searchInput).toHaveValue('test movie');

    const clearButton = screen.getByTestId('clear-input-button');
    await user.click(clearButton);

    expect(searchInput).toHaveValue('');
  });

  it('handles next page for search results', async () => {
    const user = userEvent.setup();

    vi.mocked(searchMovies)
      .mockResolvedValueOnce({
        results: mockMovies.slice(0, 2),
        total_pages: 3,
        page: 1,
      })
      .mockResolvedValueOnce({
        results: mockMovies.slice(2, 4),
        total_pages: 3,
        page: 2,
      });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(searchInput, 'test');
    await user.click(searchButton);

    await screen.findByText('Search results');
    const nextButton = screen.getByTestId('next-page-button');
    await user.click(nextButton);

    expect(vi.mocked(searchMovies)).toHaveBeenCalled();
  });

  it('handles previous page for search results', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/?searchPage=2']}>
        <App />
      </MemoryRouter>
    );

    vi.mocked(searchMovies)
      .mockResolvedValueOnce({
        results: mockMovies.slice(2, 4),
        total_pages: 3,
        page: 2,
      })
      .mockResolvedValueOnce({
        results: mockMovies.slice(0, 2),
        total_pages: 3,
        page: 1,
      });

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(searchInput, 'test');
    await user.click(searchButton);

    await screen.findByText('Search results');
    const prevButton = screen.getByTestId('next-page-button');
    await user.click(prevButton);

    expect(vi.mocked(searchMovies)).toHaveBeenCalled();
  });

  it('handles next page for popular movies', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchPopularMovies).mockResolvedValueOnce({
      results: mockMovies.slice(2, 4),
      total_pages: 3,
      page: 2,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await screen.findByText('Popular movies');

    const nextButton = screen.getByTestId('next-page-button');
    await user.click(nextButton);

    expect(vi.mocked(fetchPopularMovies)).toHaveBeenCalled();
  });
});
