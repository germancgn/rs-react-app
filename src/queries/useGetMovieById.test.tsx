import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { getMovieById } from '../services/movie-service';
import { useGetMovieById } from './useGetMovieById';
import { mockMovieDetails } from '../__mocks__/movies';

vi.mock('../services/movie-service', () => ({
  getMovieById: vi.fn(),
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

describe('useGetMovieById', () => {
  it('should return movie data', async () => {
    vi.mocked(getMovieById).mockResolvedValueOnce(mockMovieDetails);

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const { result } = renderHook(() => useGetMovieById('1'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovieDetails);
  });

  it('sets isError to true on failure', async () => {
    const errorMsg = 'Something went wrong';
    vi.mocked(getMovieById).mockRejectedValueOnce(new Error(errorMsg));

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const { result } = renderHook(() => useGetMovieById('1'), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect((result.current.error as Error).message).toBe(errorMsg);
  });

  it('sets isFetching to true before data resolves', async () => {
    vi.mocked(getMovieById).mockResolvedValue(mockMovieDetails);

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    client.invalidateQueries();

    const wrapper = withQueryClient(client);

    const { result } = renderHook(() => useGetMovieById('1'), { wrapper });

    expect(result.current.isFetching).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockMovieDetails);
  });

  it('uses cached data on second call without refetch', async () => {
    vi.mocked(getMovieById).mockImplementation(() => {
      return Promise.resolve(mockMovieDetails);
    });

    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = withQueryClient(client);

    const first = renderHook(() => useGetMovieById('1'), { wrapper });
    await waitFor(() => expect(first.result.current.isSuccess).toBe(true));
    expect(getMovieById).toHaveBeenCalledTimes(1);

    const second = renderHook(() => useGetMovieById('1'), { wrapper });

    expect(second.result.current.isSuccess).toBe(true);
    expect(second.result.current.data).toEqual(mockMovieDetails);
    expect(second.result.current.isFetching).toBe(false);

    expect(getMovieById).toHaveBeenCalledTimes(1);
  });
});
