import type { RootState } from "../../store/store";

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;