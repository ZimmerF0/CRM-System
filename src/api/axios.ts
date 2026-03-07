import axios from "axios";
import { logout } from "../store/slices/authSlice";
import { store } from "../store/store";
import { tokenService } from "../services/tokenService";

export const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

api.interceptors.request.use(config => {
  const token = tokenService.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // если не 401 — просто вернуть ошибку
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // чтобы не зациклиться
    if (originalRequest._retry) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      // вызываем refresh
      const response = await axios.post(
        "https://easydev.club/api/v1/auth/refresh",
        { refreshToken },
      );

      const { accessToken, refreshToken: newRefresh } = response.data;

      // обновляем redux
      store.dispatch(accessToken);
      // обновляем refresh
      localStorage.setItem("refreshToken", newRefresh);
      // повторяем оригинальный запрос
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  },
);
