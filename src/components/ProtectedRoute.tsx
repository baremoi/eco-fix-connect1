
import { Navigate, useLocation } from "react-router-dom";
import { useMockAuth } from "@/lib/mockAuth";
import { Spinner } from "./ui/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "tradesperson" | "admin")[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { user, profile, isLoading } = useMockAuth();
  const location = useLocation();

  console.log("Protected route check:", { 
    user: user?.id, 
    profile: profile?.role,
    isLoading,
    path: location.pathname,
    allowedRoles
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="h-12 w-12 text-primary" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (!user) {
    console.log("No user, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, allow access
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // If specific roles are required and user's role is not included
  if (profile && !allowedRoles.includes(profile.role)) {
    console.log("User role not allowed:", profile.role, "Required:", allowedRoles);
    
    // Redirect based on user's role
    switch (profile.role) {
      case "tradesperson":
        return <Navigate to="/provider/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
