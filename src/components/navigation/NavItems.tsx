
import React from "react";
import { Home, Wrench, CalendarClock, ClipboardList, User, LogIn, FileText, UserPlus, BarChart, Users } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const commonItems: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
];

export const guestItems: NavItem[] = [
  { title: "Login", href: "/login", icon: LogIn },
  { title: "Register", href: "/register", icon: UserPlus },
];

export const userItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Find Services", href: "/trades", icon: Wrench },
  { title: "Bookings", href: "/bookings", icon: CalendarClock },
  { title: "Profile & Settings", href: "/dashboard/profile", icon: User },
];

export const tradeItems: NavItem[] = [
  { title: "Dashboard", href: "/provider/dashboard", icon: Home },
  { title: "Projects", href: "/provider/projects", icon: ClipboardList },
  { title: "Reports", href: "/provider/reports", icon: FileText },
  { title: "Profile & Settings", href: "/dashboard/profile", icon: User },
];

export const adminItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: Home },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart },
  { title: "Team", href: "/admin/team", icon: Users },
  { title: "Profile & Settings", href: "/dashboard/profile", icon: User },
];

export const getNavItems = (userRole?: string | null, isAuthenticated: boolean = false) => {
  if (!isAuthenticated) {
    return [...commonItems, ...guestItems];
  }
  
  switch (userRole) {
    case "user":
      return [...userItems];
    case "tradesperson":
      return [...tradeItems];
    case "admin":
      return [...adminItems];
    default:
      return [...userItems];
  }
};
