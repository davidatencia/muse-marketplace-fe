import type { AuthUser } from '@/public/auth/types/auth';
import Cookies from 'js-cookie';

const USER_INFORMATION = 'user_information';

const baseOptions: Cookies.CookieAttributes = {
  sameSite: 'lax',
  secure: import.meta.env.PROD,
};

export function setUserInformation(userData: AuthUser) {
  Cookies.set(USER_INFORMATION, JSON.stringify(userData), {
    ...baseOptions,
  });
}

function getUserInformation(): AuthUser | undefined {
  const raw = Cookies.get(USER_INFORMATION);
  return raw ? (JSON.parse(raw) as AuthUser) : undefined;
}

export function getUserName(): string | undefined {
  return getUserInformation()?.name;
}

export function clearTokens() {
  Cookies.remove(USER_INFORMATION);
}
