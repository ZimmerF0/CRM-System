import axios, { AxiosError } from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosClient.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
