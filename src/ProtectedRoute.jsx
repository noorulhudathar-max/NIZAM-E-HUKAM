// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading session...</div>;

  if (!user) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
}