import { renderHook } from '@testing-library/react';
import { useThemeContext } from './useTheme';
import { describe, expect, it } from 'vitest';

describe('useThemeContext', () => {
  it('throws an error when used outside of a ThemeProvider', () => {
    const hook = () => renderHook(() => useThemeContext());

    expect(hook).toThrow('useThemeContext must be used within a ThemeProvider');
  });
});
