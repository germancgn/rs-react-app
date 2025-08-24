import { describe, expect, it, vi } from 'vitest';
import { delay } from './delay';

describe('delay', () => {
  it('should call a function and return value after a delay', async () => {
    const mockFn = vi.fn().mockImplementation(() => 'Hello there!');
    const value = await delay(mockFn, 10);
    expect(mockFn).toBeCalledTimes(1);
    expect(value).toBe('Hello there!');
  });
});
