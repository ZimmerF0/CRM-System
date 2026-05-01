import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MetaResponse, User, UserFilters, Roles } from "../../types/users";
import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateUserRoles,
} from "../../api/usersAPI";
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

export const blockUserThunk = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("users/block", async (id, { rejectWithValue }) => {
  try {
    const response = await blockUser(id);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        getAxiosErrorMessage("Не удалось заблокировать пользователя"),
      );
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

export const unblockUserThunk = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("users/unblock", async (id, { rejectWithValue }) => {
  try {
    const response = await unblockUser(id);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(getAxiosErrorMessage("Ошибка разблокировки"));
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

export const updateUserRolesThunk = createAsyncThunk<
  User,
  { id: number; roles: Roles[] },
  { rejectValue: string }
>("users/updateRoles", async ({ id, roles }, { rejectWithValue }) => {
  try {
    const response = await updateUserRoles(id, { roles });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(getAxiosErrorMessage("Ошибка обновления ролей"));
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});
