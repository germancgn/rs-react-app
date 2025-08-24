import { cleanup, screen } from '@testing-library/react';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import Navbar from './Navbar';

afterEach(() => {
  cleanup();
});

vi.mock('../../i18n/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../i18n/navigation')>();
  return {
    ...actual,
    usePathname: vi.fn().mockReturnValue('/'),
    useRouter: vi.fn().mockReturnValue('/'),
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();

  return {
    ...actual,
    useSearchParams: vi.fn(() => {
      return {
        get: vi.fn(() => '1'),
      };
    }),
    usePathname: vi.fn().mockReturnValue('/'),
    useRouter: vi.fn().mockReturnValue('/'),
    redirect: vi.fn(),
  };
});

describe('Navbar component', () => {
  it('renders all navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });
  it('applies active class to Home link when on "/" route', () => {
    renderWithProviders(<Navbar />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('active');
  });
  // it('applies active class to About link when on "/about" route', () => {
  //   renderWithProviders(<Navbar />);
  //   const aboutLink = screen.getByRole('link', { name: /about/i });
  //   screen.debug();
  //   expect(aboutLink).toHaveClass('active');
  // });
  // it('applies inactive class to Home link when on "/about" route', () => {
  //   renderWithProviders(<Navbar />);
  //   const homeLink = screen.getByRole('link', { name: /home/i });
  //   expect(homeLink).toHaveClass('navlink-style');
  // });
});
