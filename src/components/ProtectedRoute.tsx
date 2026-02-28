import { Navigate } from "react-router";
import { useAppSelector } from "../store/hooks";
import { Spin } from "antd";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isAuthChecked } = useAppSelector(
    state => state.auth,
  );

  if (!isAuthChecked) {
    return <Spin style={{ display: "block", margin: "100px auto" }} />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
