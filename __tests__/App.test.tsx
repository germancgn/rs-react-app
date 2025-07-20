import { it, expect, describe, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import '@testing-library/jest-dom/vitest';
import { mockMovies } from '../__mocks__/movies';

vi.mock('../src/services/movie-service', () => ({
  fetchPopularMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
  searchMovies: vi.fn(() => Promise.resolve({ results: mockMovies })),
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
  it('updates input value when user types', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search movies...');
    const movieName = 'The Edge of Tomorrow';
    fireEvent.change(searchInput, {
      target: { value: movieName },
    });
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
});
