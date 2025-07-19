import {
  fetchPopularMovies,
  searchMovies,
  discoverMovies,
  trendingMovies,
} from '../../src/services/movie-service';
import { it, describe, vi, afterEach, expect } from 'vitest';
import HttpError from '../../src/utils/HttpError';

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
  });
});
