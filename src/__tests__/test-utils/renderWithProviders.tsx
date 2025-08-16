import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithProviders(element: React.ReactElement) {
  const client = createTestQueryClient();
  return render(
    <ThemeProvider>
      <QueryClientProvider client={client}>{element}</QueryClientProvider>
    </ThemeProvider>
  );
}
