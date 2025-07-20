import { it, expect, describe, afterEach, vi } from 'vitest';
import Header from '../../src/components/Header';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Header', () => {
  it('renders the search input with the correct searchTerm from props', () => {
    render(
      <Header
        searchTerm="Matrix"
        onSearch={() => {}}
        onInputChange={() => {}}
        isLoading={false}
      />
    );

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Matrix');
  });

  it('calls onInputChange when typing in the input field', async () => {
    const user = userEvent.setup();
    const mockOnInputChange = vi.fn();
    render(
      <Header
        searchTerm=""
        onSearch={() => {}}
        onInputChange={mockOnInputChange}
        isLoading={false}
      />
    );

    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'Batman');

    expect(mockOnInputChange).toHaveBeenCalled();
  });

  it('calls onSearch when the search button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(
      <Header
        searchTerm="test"
        onSearch={mockOnSearch}
        onInputChange={() => {}}
        isLoading={false}
      />
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('shows a spinner when isLoading is true', () => {
    render(
      <Header
        searchTerm=""
        onSearch={() => {}}
        onInputChange={() => {}}
        isLoading={true}
      />
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('does not show a spinner when isLoading is false', () => {
    render(
      <Header
        searchTerm=""
        onSearch={vi.fn()}
        onInputChange={vi.fn()}
        isLoading={false}
      />
    );

    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();
  });
});
