import { createSlice } from "@reduxjs/toolkit";
import { initialAuthState } from "../../initialState";
import { fetchProfile, login, refresh, register } from "../thunks";
import { tokenService } from "../../../services/tokenService";

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      tokenService.clear();
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
      .addCase(register.fulfilled, state => {
        state.isLoading = false;
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
        tokenService.set(action.payload.accessToken);
        state.refreshToken = action.payload.refreshToken;
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
        state.isLoading = false;
        tokenService.set(action.payload.accessToken);
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(refresh.pending, state => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(refresh.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.refreshToken = null;
        tokenService.clear();
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
