import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';

import { fetchPopularMovies } from '../services/movie-service';
import { usePopularMovies } from './usePopularMovies';
import { mockMovieResponse } from '../__mocks__/movies';
import { withQueryClient } from '../__tests__/test-utils/withProvidersQueryWrapper';

vi.mock('../services/movie-service', () => ({
  fetchPopularMovies: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('usePopularMovies', () => {
  it('should return movies data', async () => {
    vi.mocked(fetchPopularMovies).mockResolvedValueOnce(mockMovieResponse);

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const { result } = renderHook(
      () => usePopularMovies(1, mockMovieResponse, 1),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovieResponse);
  });

  // it('sets isError to true on failure', async () => {
  //   const errorMsg = 'Failed to fetch popular movies';
  //   vi.mocked(fetchPopularMovies).mockRejectedValueOnce(new Error(errorMsg));

  //   const client = new QueryClient({
  //     defaultOptions: { queries: { retry: false } },
  //   });
  //   const wrapper = withQueryClient(client);

  //   const { result } = renderHook(
  //     () => usePopularMovies(1, mockMovieResponse, 1),
  //     { wrapper }
  //   );

  //   await waitFor(() => expect(result.current.isError).toBe(true));
  //   expect((result.current.error as Error).message).toBe(errorMsg);
  // });

  // it('sets isFetching to true before data resolves', async () => {
  //   vi.mocked(fetchPopularMovies).mockResolvedValue(mockMovieResponse);

  //   const client = new QueryClient({
  //     defaultOptions: { queries: { retry: false } },
  //   });
  //   client.invalidateQueries();
  //   const wrapper = withQueryClient(client);

  //   const { result } = renderHook(
  //     () => usePopularMovies(1, mockMovieResponse, 1),
  //     { wrapper }
  //   );

  //   expect(result.current.isFetching).toBe(true);
  //   expect(result.current.data).toBeUndefined();

  //   await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   expect(result.current.data).toEqual(mockMovieResponse);
  // });

  // it('uses cached data on second call without refetch', async () => {
  //   vi.mocked(fetchPopularMovies).mockImplementation(() =>
  //     Promise.resolve(mockMovieResponse)
  //   );

  //   const client = new QueryClient({
  //     defaultOptions: { queries: { retry: false } },
  //   });
  //   const wrapper = withQueryClient(client);

  //   const first = renderHook(() => usePopularMovies(1, mockMovieResponse, 1), {
  //     wrapper,
  //   });
  //   await waitFor(() => expect(first.result.current.isSuccess).toBe(true));
  //   expect(fetchPopularMovies).toHaveBeenCalledTimes(1);

  //   const second = renderHook(() => usePopularMovies(1, mockMovieResponse, 1), {
  //     wrapper,
  //   });
  //   expect(second.result.current.isSuccess).toBe(true);
  //   expect(second.result.current.data).toEqual(mockMovieResponse);
  //   expect(second.result.current.isFetching).toBe(false);
  //   expect(fetchPopularMovies).toHaveBeenCalledTimes(1);
  // });
});
