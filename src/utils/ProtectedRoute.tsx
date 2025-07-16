import useAuth from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const user = auth;

  return user ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
