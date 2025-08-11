import { it, expect, describe, afterEach, vi } from 'vitest';
import Header from './Header';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockMovies } from '../../__mocks__/movies';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';

vi.mock('../../services/movie-service', () => ({
  trendingMovies: vi.fn(() =>
    Promise.resolve({ results: mockMovies.slice(0, 3) })
  ),
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Header', () => {
  it('renders the search input with the correct searchTerm from props', () => {
    renderWithProviders(
      <MemoryRouter>
        <Header
          searchTerm="Matrix"
          onSearch={() => {}}
          onInputChange={() => {}}
          onClearInput={vi.fn()}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Matrix');
  });

  it('calls onInputChange when typing in the input field', async () => {
    const user = userEvent.setup();
    const mockOnInputChange = vi.fn();
    renderWithProviders(
      <MemoryRouter>
        <Header
          searchTerm=""
          onSearch={() => {}}
          onInputChange={mockOnInputChange}
          onClearInput={vi.fn()}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'Batman');

    expect(mockOnInputChange).toHaveBeenCalled();
  });

  it('calls onSearch when the search button is clicked', () => {
    const mockOnSearch = vi.fn();
    renderWithProviders(
      <MemoryRouter>
        <Header
          searchTerm="test"
          onSearch={mockOnSearch}
          onInputChange={() => {}}
          onClearInput={vi.fn()}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(
      <MemoryRouter>
        <Header
          searchTerm="test"
          onSearch={mockOnSearch}
          onInputChange={() => {}}
          onClearInput={vi.fn()}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, '{enter}');

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onClearInput when clear button is clicked', () => {
    const mockOnClearInput = vi.fn();
    renderWithProviders(
      <MemoryRouter>
        <Header
          searchTerm="test query"
          onSearch={() => {}}
          onInputChange={() => {}}
          onClearInput={mockOnClearInput}
        />
      </MemoryRouter>
    );

    const clearButton = screen.getByTestId('clear-input-button');
    fireEvent.click(clearButton);

    expect(mockOnClearInput).toHaveBeenCalledTimes(1);
  });

  it('displays FeaturedMovieCard components for trending movies', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header
          searchTerm=""
          onSearch={() => {}}
          onInputChange={() => {}}
          onClearInput={vi.fn()}
        />
      </MemoryRouter>
    );

    const movieCards = await screen.findAllByTestId('movie-card-featured');

    expect(movieCards).toHaveLength(3);

    expect(screen.getByText('Trending movies')).toBeInTheDocument();
  });
});
