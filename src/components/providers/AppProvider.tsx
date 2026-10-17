import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface AppProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Top-level provider composition root.
 * Provides the single shared TanStack Query client to the whole app.
 */
export function AppProvider({ children }: AppProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

