import axios from 'axios';
import { env } from '@shared/config/env';
import { getAccessToken } from '@shared/api/tokenStorage';
import { notifyRequestEnd, notifyRequestStart } from '@shared/context/LoadingProvider/loadingBridge';

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    notifyRequestStart();

    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    notifyRequestEnd();
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    notifyRequestEnd();
    return response;
  },
  (error) => {
    notifyRequestEnd();
    return Promise.reject(error);
  },
);
