import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'muse_access_token';
const REFRESH_TOKEN_KEY = 'muse_refresh_token';

const ACCESS_TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // matches backend access token expiry
const REFRESH_TOKEN_TTL_DAYS = 7; // matches backend refresh token expiry

const baseOptions: Cookies.CookieAttributes = {
  sameSite: 'lax',
  secure: import.meta.env.PROD,
};

export function setTokens(accessToken: string, refreshToken: string) {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    ...baseOptions,
    expires: new Date(Date.now() + ACCESS_TOKEN_TTL_MS),
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...baseOptions,
    expires: REFRESH_TOKEN_TTL_DAYS,
  });
}

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}
