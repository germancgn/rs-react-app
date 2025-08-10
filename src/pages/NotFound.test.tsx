import { cleanup, render, screen } from '@testing-library/react';
import { it, describe, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

afterEach(() => {
  cleanup();
});

describe('NotFound.tsx', () => {
  it('should render 404 page with the header text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: /404 Not Found/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render link for navigating to home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /Go to Home/i });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toBeInTheDocument();
  });
});
