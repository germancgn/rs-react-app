import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { afterEach, describe, expect, it } from 'vitest';
import { ThemeProvider } from '../../contexts/ThemeProvider';

afterEach(() => {
  cleanup();
});

describe('Navbar component', () => {
  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('applies active class to Home link when on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('active');
  });

  it('applies active class to About link when on "/about" route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });

  it('applies inactive class to Home link when on "/about" route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('navlink-style');
  });
});
