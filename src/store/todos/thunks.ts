import type {
  FilterType,
  Todo,
  TodoInfo,
  MetaResponse,
} from "../../types/todo";
import { getFilteredTask } from "../../api/tasksAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosErrorMessage } from "../utils";

export const fetchTodos = createAsyncThunk<
  MetaResponse<Todo, TodoInfo>,
  FilterType,
  { rejectValue: string }
>("todos/fetchTodos", async (filter, thunkAPI) => {
  try {
    return await getFilteredTask(filter);
  } catch (err) {
    return thunkAPI.rejectWithValue(
      getAxiosErrorMessage(err, "Не удалось зарегистрироваться"),
    );
  }
});
