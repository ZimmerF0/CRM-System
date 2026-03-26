import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MetaResponse, User, UserFilters } from "../../types/users";
import { deleteUser, getUsers } from "../../api/usersAPI";
import { getAxiosErrorMessage } from "../utils";
import axios from "axios";

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