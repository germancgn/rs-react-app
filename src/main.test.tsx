import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('main.tsx', () => {
  it('throws an error if root element is not found', async () => {
    document.body.innerHTML = '';
    let error: Error | null = null;
    try {
      await import('../src/main.tsx');
    } catch (e) {
      error = e as Error;
    }
    expect(error).not.toBeNull();
    expect(error?.message).toBe('Root element not found');
  });
});
