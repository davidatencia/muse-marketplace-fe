import { httpClient } from '@shared/api/httpClient';
import type { LoginRequest, LoginResponse } from '@public/auth/types/auth';

export function login(body: LoginRequest) {
  return httpClient
    .post<LoginResponse>('/login', body)
    .then((response) => response.data);
}
