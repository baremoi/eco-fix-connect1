import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userMenuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
  ];

  const tradespersonMenuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Projects", href: "/provider/projects" },
    { label: "Reports", href: "/provider/reports" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
  ];

  const adminMenuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Team", href: "/admin/team" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case "tradesperson":
        return tradespersonMenuItems;
      case "admin":
        return adminMenuItems;
      default:
        return userMenuItems;
    }
  };

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Eco-Fix Connect
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {getMenuItems().map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-sm font-medium"
              >
                Sign Out
              </Button>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white hover:bg-primary/90 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 