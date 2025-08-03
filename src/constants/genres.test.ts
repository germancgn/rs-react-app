import { genreMap } from '../../src/constants/genres';
import { describe, it, expect } from 'vitest';

describe('genres.ts', () => {
  it('should include items', () => {
    expect(genreMap.length).toBeGreaterThan(0);
  });

  it('should have valid structure', () => {
    genreMap.forEach((genre) => {
      expect(genre).toHaveProperty('id');
      expect(genre).toHaveProperty('name');
      expect(typeof genre.id).toBe('number');
      expect(typeof genre.name).toBe('string');
    });
  });

  it('should include specific genres', () => {
    const genreNames = genreMap.map((genre) => genre.name);
    expect(genreNames).toContain('Action');
    expect(genreNames).toContain('Comedy');
    expect(genreNames).toContain('Drama');
  });
});
