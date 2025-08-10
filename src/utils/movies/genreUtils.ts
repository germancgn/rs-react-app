import { genreMap } from '../../constants/genres';

export const getGenreNameById = (id: number): string | undefined => {
  return genreMap.find((g) => g.id === id)?.name;
};
