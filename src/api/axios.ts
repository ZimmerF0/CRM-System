import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";
import { logout } from "../store/auth/Slices/slice";
import { store } from "../store/store";
import { tokenService } from "../services/tokenService";

type RetryableRequest = InternalAxiosRequestConfig & {
  _hasRetried?: boolean;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const refreshApi = axios.create({
baseURL: import.meta.env.VITE_API_URL,
  });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = tokenService.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequest;

    // если не 401 — просто вернуть ошибку
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // чтобы не зациклиться
    if (originalRequest._hasRetried) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    originalRequest._hasRetried = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    try {
      // вызываем refresh
      const response = await refreshApi.post<{
        accessToken: string;
        refreshToken: string;
      }>("/auth/refresh", { refreshToken });

      const { accessToken, refreshToken: newRefresh } = response.data;

      // обновляем redux
      tokenService.set(accessToken);
      // обновляем refresh
      localStorage.setItem("refreshToken", newRefresh);
      // повторяем оригинальный запрос
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  },
);
