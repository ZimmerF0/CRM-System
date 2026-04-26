import type { Profile } from "../types/auth";
import type { FilterType, Todo, TodoInfo } from "../types/todo";

export interface AuthState {
  currentUser: Profile | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

export type TodoState = {
  todos: Todo[];
  info: TodoInfo;
  activeFilter: FilterType;
  loading: boolean;
  error: string | null;
};

export const initialAuthState: AuthState = {
  currentUser: null,
  refreshToken: null,
  isAuthenticated: false,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const initialTodoState: TodoState = {
  todos: [],
  info: { all: 0, completed: 0, inWork: 0 },
  activeFilter: "all",
  loading: false,
  error: null,
};

export const initialState = {
  auth: initialAuthState,
  todos: initialTodoState,
};
