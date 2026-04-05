
import type { Profile } from "../types/auth";
import type { FilterType, Todo, TodoInfo } from "../types/todo";
import type { User, UserFilters } from "../types/users";

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

interface UsersState {
  users: User[];
  currentUser: User | null;
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  } | null;
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
}



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



export const initialUserState: UsersState = {
  users: [],
  currentUser: null,
  meta: null,
  isLoading: false,
  error: null,
  filters: {
    page: 0,
    limit: 20,
  },
};


export const initialState = {
  auth: initialAuthState,
  todos: initialTodoState,
  users: initialUserState,

};
