import { create } from 'zustand';
import type { Movie } from '../types/movies/Movie';

type MovieStore = {
  selected: Movie[];
  add: (movie: Movie) => void;
  remove: (id: number) => void;
  clear: () => void;
  hasItem: (id: number) => boolean;
};

export const useMovieStore = create<MovieStore>((set, get) => ({
  selected: [],
  add: (movie) => {
    const exists = get().selected.find((m) => m.id === movie.id);
    if (!exists) {
      set((state) => ({ selected: [...state.selected, movie] }));
    }
  },
  remove: (id) =>
    set((state) => ({
      selected: state.selected.filter((movie) => movie.id !== id),
    })),
  clear: () => set({ selected: [] }),
  hasItem: (id) => get().selected.some((movie) => movie.id === id),
}));
