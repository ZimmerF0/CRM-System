import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { FilterType, Todo, TodoInfo, MetaResponse } from "../types/todo";
import { getFilteredTask } from "../api/tasksAPI";
import type { RootState } from "../store/store";

type TodoState = {
  todos: Todo[];
  info: TodoInfo;
  activeFilter: FilterType;
  loading: boolean;
  error: string | null;
};

const initialState: TodoState = {
  todos: [],
  info: { all: 0, completed: 0, inWork: 0 },
  activeFilter: "all",
  loading: false,
  error: null,
};

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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterType>) {
      state.activeFilter = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
      state.info.all += 1;
      state.info.inWork += action.payload.isDone ? 0 : 1;
      state.info.completed += action.payload.isDone ? 1 : 0;
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.data;

        if (action.payload.info) {
          state.info = action.payload.info;
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Не удалось загрузить задачи";
      });
  },
});

export const { addTodo, removeTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectInfo = (state: RootState) => state.todos.info;
export const selectFilter = (state: RootState) => state.todos.activeFilter;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
