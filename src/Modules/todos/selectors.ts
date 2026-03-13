import type { RootState } from "../../store/store";

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectInfo = (state: RootState) => state.todos.info;
export const selectFilter = (state: RootState) => state.todos.activeFilter;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;