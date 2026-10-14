import type { ReactNode } from 'react';

export interface AppProviderProps {
  children: ReactNode;
}

/**
 * Lightweight top-level provider.
 *
 * Today it only forwards its children, giving the application a single,
 * well-known composition root. When cross-cutting concerns are needed later
 * (theme, i18n, query clients, and so on) they can be layered in here without
 * changing the component tree in `main.tsx`. No Context or state library is
 * introduced until one is genuinely required.
 */
export function AppProvider({ children }: AppProviderProps) {
  return <>{children}</>;
}
