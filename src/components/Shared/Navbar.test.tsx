import { cleanup, screen } from '@testing-library/react';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../../__tests__/test-utils/renderWithProviders';
import Navbar from './Navbar';
import * as nextIntlNavigation from '../../i18n/navigation';

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

  it('applies active class to About link when on "/about" route', () => {
    vi.spyOn(nextIntlNavigation, 'usePathname').mockImplementation(
      () => '/about'
    );
    renderWithProviders(<Navbar />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    screen.debug();
    expect(aboutLink).toHaveClass('active');
  });
});
