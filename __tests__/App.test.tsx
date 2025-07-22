import { it, expect, describe, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../__mocks__/movies';
import { searchMovies } from '../src/services/movie-service';

vi.mock('../src/services/movie-service', () => ({
  fetchPopularMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
  searchMovies: vi.fn((movieName: string) =>
    Promise.resolve({
      results: mockMovies.filter((m) => m.title === movieName),
    })
  ),
  discoverMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
  trendingMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

describe('App Rendering Tests', () => {
  it('renders search input and search button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    const movieName = 'The Lord of the Rings';
    localStorage.setItem('searchItem', movieName);
    render(<App />);
    expect(screen.getByDisplayValue(movieName)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search movies...')).toHaveValue(
      movieName
    );
  });

  it('shows empty input when no saved term exists', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search movies...')).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search movies...');
    const movieName = 'The Edge of Tomorrow';

    await user.type(searchInput, movieName);

    expect(searchInput).toHaveValue(movieName);
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'The Edge of Tomorrow';

    await user.type(searchInput, movieName);
    expect(searchInput).toHaveValue(movieName);

    await user.click(searchButton);

    expect(localStorage.getItem('searchItem')).toBe(movieName);
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = '   The Edge of Tomorrow   ';
    await user.type(searchInput, movieName);
    expect(searchInput).toHaveValue(movieName);
    await user.click(searchButton);
    expect(localStorage.getItem('searchItem')).toBe(movieName.trim());
  });

  it('sets isLoading to true and shows loading spinner when search button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'The Edge of Tomorrow';

    await user.type(searchInput, movieName);
    await user.click(searchButton);

    expect(searchButton).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('render search results when user types in a movie name and clicks search button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const movieName = 'How to Train Your Dragon';

    await user.type(searchInput, movieName);
    await user.click(searchButton);

    expect(await screen.findByText(movieName)).toBeInTheDocument();
  });

  it('does not call searchMovies if searchTerm is empty or whitespace', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search movies...');
    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.type(searchInput, '   ');
    await user.click(searchButton);

    expect(searchMovies).not.toHaveBeenCalled();
    expect(searchButton).not.toBeDisabled();
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});
