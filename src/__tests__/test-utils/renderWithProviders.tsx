import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

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
      <NextIntlClientProvider locale="en" messages={messages}>
        <QueryClientProvider client={client}>{element}</QueryClientProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
