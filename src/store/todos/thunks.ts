import type {
  FilterType,
  Todo,
  TodoInfo,
  MetaResponse,
} from "../../types/todo";
import { getFilteredTask } from "../../api/tasksAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk<
  MetaResponse<Todo, TodoInfo>,
  FilterType,
  { rejectValue: string }
>("todos/fetchTodos", async (filter, { rejectWithValue }) => {
  try {
    return await getFilteredTask(filter);
  } catch {
    return rejectWithValue("Не удалось загрузить задачи");
  }
});
