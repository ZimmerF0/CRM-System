import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Token,
  type AuthData,
  type Profile,
  type UserRegistration,
} from "../../types/auth";
import axios from "axios";
import type { RootState } from "../store";

interface AuthState {
  currentUser: Profile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

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
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      switch (status) {
        case 400:
          return thunkAPI.rejectWithValue("Неверные данные");
        case 409:
          return thunkAPI.rejectWithValue("Пользователь уже существует");
        case 500:
          return thunkAPI.rejectWithValue("Ошибка сервера");
        default:
          return thunkAPI.rejectWithValue("Неизвестная ошибка");
      }
    }
    return thunkAPI.rejectWithValue("Unknown error");
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
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        switch (status) {
          case 400:
            return thunkAPI.rejectWithValue("Неверные данные");
          case 401:
            return thunkAPI.rejectWithValue("Неверный логин или пароль");
          case 500:
            return thunkAPI.rejectWithValue("Ошибка сервера");
          default:
            return thunkAPI.rejectWithValue("Ошибка авторизации");
        }
      }
      return thunkAPI.rejectWithValue("Ошибка сети");
    }
  },
);

export const fetchProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("auth/fetchProfile", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get("https://easydev.club/api/v1/user/profile", {
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload; // Profile
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })

      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Login failed";
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export default authSlice.reducer;
