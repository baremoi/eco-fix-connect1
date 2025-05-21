
import { useMockAuth } from "@/lib/mockAuth";
import { getNavItems } from "./navigation/NavItems";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";

const Navigation = () => {
  const { user, profile } = useMockAuth();

  // Add bookings to nav items for authenticated users
  const baseNavItems = getNavItems(profile?.role, !!user);
  
  // Add bookings link for authenticated users
  const navItems = user 
    ? [...baseNavItems, { name: "My Bookings", href: "/bookings" }]
    : baseNavItems;

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
