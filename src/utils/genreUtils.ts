import { genreMap } from '../constants/genres';

export const getGenreNameById = (id: number): string | undefined => {
  if (typeof id !== 'number' || isNaN(id)) {
    return undefined;
  }
  const genre = genreMap.find((g) => g.id === id);
  return genre?.name;
};
