
import { useAuth } from "@/lib/AuthContext";
import { useLocation } from "react-router-dom";
import { getNavItems } from "./navigation/NavItems";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";

const Navigation = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();

  // Determine which nav items to show based on user role
  const navItems = getNavItems(profile?.role, !!user);

  return (
    <>
      <DesktopNavigation 
        navItems={navItems}
        user={user}
        profile={profile}
        logout={logout}
      />
      <MobileNavigation
        navItems={navItems}
        user={user}
        profile={profile}
        logout={logout}
      />
    </>
  );
};

export default Navigation;
