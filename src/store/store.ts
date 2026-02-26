import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../store/slices/todoSlice";
import authReducer from "../store/slices/authSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
