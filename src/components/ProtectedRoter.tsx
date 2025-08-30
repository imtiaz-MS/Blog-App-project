import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRouterProps {
  children: ReactNode;
}
const ProtectedRoter = ({ children }: ProtectedRouterProps) => {
  const token = localStorage.getItem("loginToken");
  if (!token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoter;
