import { createSlice} from "@reduxjs/toolkit";
import { deleteUserThunk, fetchUsers } from "../thunks";
import {  initialUserState } from "../../initialState";



export const usersSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка";
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export const { setFilters } = usersSlice.actions;
export default usersSlice.reducer;
