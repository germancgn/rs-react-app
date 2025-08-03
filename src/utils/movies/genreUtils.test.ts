import { genreMap } from '../../constants/genres';
import { getGenreNameById } from './genreUtils';
import { describe, it, expect } from 'vitest';

describe('genreUtils', () => {
  it('should return correct genre name for a valid id', () => {
    const validGenre = genreMap[0];
    expect(getGenreNameById(validGenre.id)).toBe(validGenre.name);
  });

  it('should return undefined for an invalid id', () => {
    expect(getGenreNameById(-1)).toBeUndefined();
    expect(getGenreNameById(99999)).toBeUndefined();
  });

  it('should handle edge cases gracefully', () => {
    expect(getGenreNameById(null as unknown as number)).toBeUndefined();
    expect(getGenreNameById(undefined as unknown as number)).toBeUndefined();
    expect(getGenreNameById('string' as unknown as number)).toBeUndefined();
  });
});
