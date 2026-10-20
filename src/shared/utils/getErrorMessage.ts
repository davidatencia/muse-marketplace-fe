import { ApiError } from '@shared/api/httpClient';

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    const data = error.data as { message?: string } | undefined;

    if (data?.message) {
      return data.message;
    }
  }

  return fallback;
}
