import {
  fetchPopularMovies,
  searchMovies,
  discoverMovies,
  trendingMovies,
  getMovieById,
} from '../../src/services/movie-service';
import { it, describe, vi, afterEach, expect } from 'vitest';
import HttpError from '../../src/utils/HttpError';
import { mockMovies } from '../__mocks__/movies';

const mockResponse = {
  results: [
    { id: 1, title: 'Title 1' },
    { id: 2, title: 'Title 2' },
  ],
};

describe('movie-service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchPopularMovies', () => {
    it('should return movies on a successful API call', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const response = await fetchPopularMovies();

      expect(response).toEqual(mockResponse);
    });

    it('should throw HTTPError when API call fails', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        } as Response)
      );

      await expect(fetchPopularMovies()).rejects.toThrowError(HttpError);
    });

    it('should throw an Error when an unexpected error occurs', async () => {
      globalThis.fetch = vi.fn(() => {
        throw new Error('Unexpected Error');
      });

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(fetchPopularMovies()).rejects.toThrow('Unexpected Error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'fetchPopularMovies - Unexpected Error:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('searchMovies', () => {
    it('should return movies on a successful search', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const response = await searchMovies('Matrix');

      expect(response).toEqual(mockResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('query=Matrix')
      );
    });

    it('should throw HTTPError when search API call fails', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
      );

      await expect(searchMovies('Matrix')).rejects.toThrowError(HttpError);
    });

    it('should throw an Error when an unexpected error occurs', async () => {
      globalThis.fetch = vi.fn(() => {
        throw new Error('Unexpected Error');
      });

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(searchMovies('Matrix')).rejects.toThrow('Unexpected Error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'searchMovies - Unexpected Error:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('discoverMovies', () => {
    it('should return movies on a successful discover API call', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const response = await discoverMovies(2);

      expect(response).toEqual(mockResponse);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
      );
    });

    it('should throw HTTPError when discover API call fails', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        } as Response)
      );

      await expect(discoverMovies(2)).rejects.toThrowError(HttpError);
    });

    it('should throw an Error when an unexpected error occurs', async () => {
      globalThis.fetch = vi.fn(() => {
        throw new Error('Unexpected Error');
      });

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(discoverMovies(2)).rejects.toThrow('Unexpected Error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'discoverMovies - Unexpected Error:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('trendingMovies', () => {
    it('should return trending movies on a successful API call', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response)
      );

      const response = await trendingMovies();

      expect(response).toEqual(mockResponse);
    });

    it('should throw HTTPError when trending API call fails', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await expect(trendingMovies()).rejects.toThrowError(HttpError);
    });

    it('should throw an Error when an unexpected error occurs', async () => {
      globalThis.fetch = vi.fn(() => {
        throw new Error('Unexpected Error');
      });
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(trendingMovies()).rejects.toThrow('Unexpected Error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'trendingMovies - Unexpected Error:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getMovieById', () => {
    const movie = mockMovies[0];

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return movie details on a successful API call', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(movie),
        } as Response)
      );

      const response = await getMovieById(String(movie.id));
      expect(response).toEqual(movie);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/movie/${movie.id}`)
      );
    });

    it('should throw HttpError when API call returns an error response', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        } as Response)
      );

      await expect(getMovieById(String(movie.id))).rejects.toThrowError(
        HttpError
      );
    });

    it('should throw an unexpected error and log it', async () => {
      globalThis.fetch = vi.fn(() => {
        throw new Error('Network Error');
      });

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(getMovieById(String(movie.id))).rejects.toThrow(
        'Network Error'
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'getMovieById - Unexpected Error:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
