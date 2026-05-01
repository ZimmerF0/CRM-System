import { createSlice } from "@reduxjs/toolkit";
import { fetchUserById, updateUserThunk } from "../thunks";
import { initialUserState } from "../../initialState";

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })

      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export default userSlice.reducer;
