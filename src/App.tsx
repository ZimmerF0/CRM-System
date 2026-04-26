import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import TodoListPage from "./pages/TodoList/TodoListPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import UsersPage from "./pages/Users/UsersPage.tsx";
import UserProfilePage from "./pages/UserProfile/UserProfilePage.tsx";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAppDispatch } from "./store/hooks.ts";
import { refresh, fetchProfile } from "./store/auth/thunks";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refresh())
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
      })
      .catch(() => {});
  }, [dispatch]);

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
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
