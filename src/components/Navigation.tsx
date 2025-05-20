
import { useMockAuth } from "@/lib/mockAuth";
import { getNavItems } from "./navigation/NavItems";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";

const Navigation = () => {
  const { user, profile } = useMockAuth();

  // Determine which nav items to show based on user role
  const navItems = getNavItems(profile?.role, !!user);

  return (
    <>
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
