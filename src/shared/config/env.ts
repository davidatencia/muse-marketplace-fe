export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
