import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useContext(authContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
