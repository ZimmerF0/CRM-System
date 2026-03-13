import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterType, Todo } from "../../../types/todo";
import { initialTodoState } from "../../initialState";
import { fetchTodos } from "../thunks";

const todoSlice = createSlice({
  name: "todos",
  initialState: initialTodoState,
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
