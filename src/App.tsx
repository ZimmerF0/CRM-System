import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import TodoListPage from "./pages/TodoList/TodoListPage.tsx";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import AuthLayout from "./layouts/AuthLayout/AuthLayout.tsx";
import RegisterPage from "./pages/Register/RegisterPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="list" element={<TodoListPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
