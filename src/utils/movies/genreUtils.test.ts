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
  });
});
