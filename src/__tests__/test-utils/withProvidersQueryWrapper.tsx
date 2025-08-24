import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextIntlClientProvider } from 'next-intl';

export const withQueryClient = (client: QueryClient) => {
  const QueryClientWrapper = ({ children }: React.PropsWithChildren) => (
    <NextIntlClientProvider locale="en" messages={{}}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextIntlClientProvider>
  );
  QueryClientWrapper.displayName = 'QueryClientWrapper';
  return QueryClientWrapper;
};
