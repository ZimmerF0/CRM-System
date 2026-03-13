import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  AuthData,
  Profile,
  Token,
  UserRegistration,
} from "../../types/auth";
import type { RootState } from "../store";
import { tokenService } from "../../services/tokenService";
import { handleAxiosError } from "../utils";

export const register = createAsyncThunk<
  Profile, // что возвращает сервер
  UserRegistration, // что отправляем
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://easydev.club/api/v1/auth/signup",
      userData,
      { headers: { "Content-Type": "application/json" } },
    );

    return response.data; // Profile
  } catch (err) {
    return thunkAPI.rejectWithValue(
      handleAxiosError(err, "Не удалось зарегистрироваться"),
    );
  }
});

export const login = createAsyncThunk<Token, AuthData, { rejectValue: string }>(
  "auth/login",
  async (AuthData, thunkAPI) => {
    try {
      const responce = await axios.post(
        "https://easydev.club/api/v1/auth/signin",
        AuthData,
        { headers: { "Content-Type": "application/json" } },
      );
      return responce.data; // Токен
    } catch (err) {
      return thunkAPI.rejectWithValue(
        handleAxiosError(err, "Ошибка авторизации"),
      );
    }
  },
);

export const fetchProfile = createAsyncThunk<
  Profile,
  void,
  { state: RootState; rejectValue: string }
>("auth/fetchProfile", async (_, thunkAPI) => {
  try {
    const token = tokenService.get();

    if (!token) {
      return thunkAPI.rejectWithValue("Нет access токена");
    }

    const response = await axios.get(
      "https://easydev.club/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch {
    return thunkAPI.rejectWithValue("Не удалось получить профиль");
  }
});

export const refresh = createAsyncThunk<Token, void, { rejectValue: string }>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return thunkAPI.rejectWithValue("Нет refresh токена");
      }

      const response = await axios.post(
        "https://easydev.club/api/v1/auth/refresh",
        { refreshToken },
      );

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("Сессия истекла");
    }
  },
);
