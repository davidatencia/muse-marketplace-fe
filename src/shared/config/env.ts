export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
