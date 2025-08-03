import { describe, it, expect, beforeEach, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import userEvent from '@testing-library/user-event';

class MockAudio {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  load = vi.fn();
  currentTime = 0;
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
}

vi.stubGlobal('Audio', MockAudio);

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
