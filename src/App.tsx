import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Spin } from "antd";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import TodoListPage from "./pages/TodoList/TodoListPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.tsx";
import RegisterPage from "./pages/Register/RegisterPage.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { refresh } from "./store/auth/thunks";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export default function App() {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector(state => state.auth.isAuthChecked);

  const didRefresh = useRef(false);

  useEffect(() => {
    if (!didRefresh.current) { //refresh вызовется один раз
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

        <Route path="/" element={<MainLayout />}>
          <Route path="/list" element={<TodoListPage />} />
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
