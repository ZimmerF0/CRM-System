import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User, UserRequest } from "../../types/users";
import { getUserById, updateUser } from "../../api/usersAPI";

export const fetchUserById = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>("users/fetchUserById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await getUserById(id);
    return response.data;
  } catch {
    return rejectWithValue("Ошибка загрузки пользователя");
  }
});

export const updateUserThunk = createAsyncThunk<
  User, 
  { id: number; body: UserRequest },
  { rejectValue: string }
>("users/updateUser", async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await updateUser(id, body);
    return response.data;
  } catch {
    return rejectWithValue("Ошибка обновления пользователя");
  }
});
