import { describe, it, expect, beforeEach, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import userEvent from '@testing-library/user-event';

vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() =>
  Promise.resolve()
);

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

describe('ThemeToggleButton', () => {
  it('should toggle current theme', async () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    const toggleButton = screen.getByRole('button');
    await userEvent.click(toggleButton);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
