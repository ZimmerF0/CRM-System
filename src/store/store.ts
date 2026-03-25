import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/Slices/slice";
import todoReducer from "../store/todos/Slices/slice";
import usersReducer from "../store/users/Slices/slice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
    users : usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
