import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "tradesperson" | "admin")[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, allow access
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // If specific roles are required and user's role is not included
  if (!allowedRoles.includes(user.role)) {
    // Redirect based on user's role
    switch (user.role) {
      case "tradesperson":
        return <Navigate to="/provider/projects" replace />;
      case "admin":
        return <Navigate to="/admin/analytics" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
} 