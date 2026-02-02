import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isRegistered = localStorage.getItem("registrationSuccess");

  if (!isRegistered) {
    return <Navigate to="/register" replace />;
  }

  return children;
}
