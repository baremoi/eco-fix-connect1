
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import {
  Home,
  Wrench,
  CalendarClock,
  ClipboardList,
  User,
  LogIn, 
  FileText, 
  UserPlus, 
  BarChart, 
  Users, 
  LogOut, 
  Menu
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Navigation = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const commonItems: NavItem[] = [
    { title: "Home", href: "/", icon: Home },
  ];

  const guestItems: NavItem[] = [
    { title: "Login", href: "/login", icon: LogIn },
    { title: "Register", href: "/register", icon: UserPlus },
  ];

  const userItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Find Services", href: "/trades", icon: Wrench },
    { title: "Bookings", href: "/bookings", icon: CalendarClock },
    { title: "Profile & Settings", href: "/dashboard/profile", icon: User },
  ];

  const tradeItems: NavItem[] = [
    { title: "Dashboard", href: "/provider/dashboard", icon: Home },
    { title: "Projects", href: "/provider/projects", icon: ClipboardList },
    { title: "Reports", href: "/provider/reports", icon: FileText },
    { title: "Profile & Settings", href: "/dashboard/profile", icon: User },
  ];

  const adminItems: NavItem[] = [
    { title: "Dashboard", href: "/admin/dashboard", icon: Home },
    { title: "Analytics", href: "/admin/analytics", icon: BarChart },
    { title: "Team", href: "/admin/team", icon: Users },
    { title: "Profile & Settings", href: "/dashboard/profile", icon: User },
  ];

  // Determine which nav items to show based on user role
  let navItems: NavItem[] = user ? commonItems : [...commonItems, ...guestItems];

  if (user && profile) {
    switch (profile.role) {
      case "user":
        navItems = [...userItems];
        break;
      case "tradesperson":
        navItems = [...tradeItems];
        break;
      case "admin":
        navItems = [...adminItems];
        break;
      default:
        navItems = [...userItems];
    }
  }

  const NavItem = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);
    
    return (
      <Link
        to={item.href}
        onClick={closeSheet}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          active 
            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-eco-600 font-display font-bold text-2xl">Eco<span className="text-sky-600">Fix</span></span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>
        
        {user && profile && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback>
                  {profile.full_name?.charAt(0) || user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">
                  {profile.full_name || user.email}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
              <Button 
                variant="ghost" 
                className="ml-auto h-8 w-8 p-0" 
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Sign out</span>
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 z-40 bg-background border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center">
            <span className="text-eco-600 font-display font-bold text-xl">Eco<span className="text-sky-600">Fix</span></span>
          </Link>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-xl font-bold text-primary mb-2">Eco-Fix Connect</p>
                </div>
                <ScrollArea className="flex-1">
                  <nav className="space-y-1 px-2">
                    {navItems.map((item) => (
                      <NavItem key={item.href} item={item} />
                    ))}
                  </nav>
                </ScrollArea>
                {user && profile && (
                  <div className="border-t border-border p-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={profile.avatar_url || undefined} />
                        <AvatarFallback>
                          {profile.full_name?.charAt(0) || user.email?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{profile.full_name || user.email}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          logout();
                          closeSheet();
                        }}
                        className="ml-auto"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Log out</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default Navigation;
