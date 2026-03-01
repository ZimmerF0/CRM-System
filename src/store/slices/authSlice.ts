import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
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
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isAuthChecked: false,
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
  { state: RootState; rejectValue: string }
>("auth/fetchProfile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.accessToken;

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem("refreshToken");
    },
  },
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

        // localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Login failed";
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      .addCase(refresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(refresh.rejected, state => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { setAccessToken, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export default authSlice.reducer;
