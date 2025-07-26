import { it, expect, describe, afterEach, vi } from 'vitest';
import Header from './Header';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Header', () => {
  it('renders the search input with the correct searchTerm from props', () => {
    render(
      <MemoryRouter>
        <Header
          searchTerm="Matrix"
          onSearch={() => {}}
          onInputChange={() => {}}
          isLoading={false}
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
    render(
      <MemoryRouter>
        <Header
          searchTerm=""
          onSearch={() => {}}
          onInputChange={mockOnInputChange}
          isLoading={false}
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
    render(
      <MemoryRouter>
        <Header
          searchTerm="test"
          onSearch={mockOnSearch}
          onInputChange={() => {}}
          isLoading={false}
          onClearInput={vi.fn()}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
