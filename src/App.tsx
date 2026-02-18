import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.tsx";
import Profile from "./pages/Profile.tsx";
import TodoListPage from "./pages/TodoListPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/list" replace />} />
          <Route path="list" element={<TodoListPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
