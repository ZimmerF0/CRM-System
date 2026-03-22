import { Navigate } from "react-router";
import { useAppSelector } from "../store/hooks";

import type { PropsWithChildren } from "react";
import { Spin } from "antd";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isAuthChecked } = useAppSelector(
    state => state.auth
  );

  if (!isAuthChecked) {
    return <Spin fullscreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
