import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Spin } from "antd";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import TodoListPage from "./pages/TodoList/TodoListPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { refresh } from "./store/auth/thunks";

export default function App() {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector(state => state.auth.isAuthChecked);

  const didRefresh = useRef(false);

  useEffect(() => {
    if (!didRefresh.current) {
      //refresh вызовется один раз
      dispatch(refresh());
      didRefresh.current = true;
    }
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Spin fullscreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
