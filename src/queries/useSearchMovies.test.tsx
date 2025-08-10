import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { searchMovies } from '../services/movie-service';
import { useSearchMovies } from './useSearchMovies';
import { mockMovieResponse } from '../__mocks__/movies';

vi.mock('../services/movie-service', () => ({
  searchMovies: vi.fn(),
}));

const withQueryClient = (client: QueryClient) => {
  const QueryClientWrapper = ({ children }: React.PropsWithChildren) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  QueryClientWrapper.displayName = 'QueryClientWrapper';
  return QueryClientWrapper;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('useSearchMovies', () => {
  it('should return movies data', async () => {
    vi.mocked(searchMovies).mockResolvedValueOnce(mockMovieResponse);

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const { result } = renderHook(() => useSearchMovies('searchTerm', 1), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovieResponse);
  });

  it('sets isError to true on failure', async () => {
    const errorMsg = 'Failed to search movies';
    vi.mocked(searchMovies).mockRejectedValueOnce(new Error(errorMsg));

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const { result } = renderHook(() => useSearchMovies('searchTerm', 1), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect((result.current.error as Error).message).toBe(errorMsg);
  });

  it('sets isFetching to true before data resolves', async () => {
    vi.mocked(searchMovies).mockResolvedValue(mockMovieResponse);

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    client.invalidateQueries();
    const wrapper = withQueryClient(client);

    const { result } = renderHook(() => useSearchMovies('searchTerm', 1), {
      wrapper,
    });

    expect(result.current.isFetching).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovieResponse);
  });

  it('uses cached data on second call without refetch', async () => {
    vi.mocked(searchMovies).mockImplementation(() =>
      Promise.resolve(mockMovieResponse)
    );

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const first = renderHook(() => useSearchMovies('searchTerm', 1), {
      wrapper,
    });
    await waitFor(() => expect(first.result.current.isSuccess).toBe(true));
    expect(searchMovies).toHaveBeenCalledTimes(1);

    const second = renderHook(() => useSearchMovies('searchTerm', 1), {
      wrapper,
    });
    expect(second.result.current.isSuccess).toBe(true);
    expect(second.result.current.data).toEqual(mockMovieResponse);
    expect(second.result.current.isFetching).toBe(false);
    expect(searchMovies).toHaveBeenCalledTimes(1);
  });
});
