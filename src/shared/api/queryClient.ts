import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { ApiError } from '@shared/api/httpClient';
import { clearSession } from '@shared/api/session';

const MAX_RETRIES = 3;

function isClientError(error: unknown) {
  return error instanceof ApiError && error.status >= 400 && error.status < 500;
}

function handleError(error: unknown) {
  if (!(error instanceof ApiError) || error.status !== 401) return;

  clearSession();
  queryClient.clear();

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) =>
        !isClientError(error) && failureCount < MAX_RETRIES,
    },
  },
});
