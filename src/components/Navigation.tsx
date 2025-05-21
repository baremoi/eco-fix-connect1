
import { useMockAuth } from "@/lib/mockAuth";
import { getNavItems } from "./navigation/NavItems";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user, profile } = useMockAuth();

  // Get navigation items based on user role
  const navItems = getNavItems(profile?.role, !!user);
  
  // Check if the user is an admin
  const isAdmin = profile?.role === "admin";
  
  return (
    <>
      {isAdmin && (
        <div className="bg-primary/10 p-2 text-center">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm" className="font-bold">
              Access Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
      <DesktopNavigation 
        navItems={navItems}
      />
      <MobileNavigation
        navItems={navItems}
      />
    </>
  );
};

export default Navigation;
