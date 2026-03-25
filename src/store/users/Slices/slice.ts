import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axios";
import type { MetaResponse, User, UserFilters } from "../../../types/users";
import axios from "axios";
import { getAxiosErrorMessage } from "../../utils";

export const getUsers = (filters?: UserFilters) => {
  return api.get<MetaResponse<User>>("/admin/users", {
    params: filters,
  });
};

export const deleteUser = (id: number) => {
  return api.delete(`/admin/users/${id}`);
};

export const fetchUsers = createAsyncThunk<
  MetaResponse<User>,
  UserFilters,
  { rejectValue: string }
>("users/fetchUsers", async (filters, { rejectWithValue }) => {
  try {
    const response = await getUsers(filters);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Ошибка сервера");
    }

    return rejectWithValue("Неизвестная ошибка");
  }
});

export const deleteUserThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await deleteUser(id);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(
      getAxiosErrorMessage(error, "Ошибка удаления пользователя"),
    );
  }
});

interface UsersState {
  users: User[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  } | null;
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
}

const initialState: UsersState = {
  users: [],
  meta: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 20,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
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
