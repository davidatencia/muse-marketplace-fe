import { isAxiosError } from 'axios';

export function getErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError<{ message: string }>(error) && error.response) {
    return error.response.data.message;
  }

  return fallback;
}
