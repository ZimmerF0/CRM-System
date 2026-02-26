import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Profile, UserRegistration } from "../../types/auth";
import axios from "axios";
import type { RootState } from "../store";

interface AuthState {
  currentUser: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
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
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export default authSlice.reducer;
