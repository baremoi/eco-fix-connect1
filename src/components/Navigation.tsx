
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  Settings, 
  UserCircle, 
  List, 
  BarChart, 
  Users, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navigation() {
  const { user, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const userMenuItems = [
    { label: "Dashboard", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { label: "Profile", href: "/profile", icon: <UserCircle className="h-4 w-4 mr-2" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  const tradespersonMenuItems = [
    { label: "Dashboard", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { label: "My Projects", href: "/provider/projects", icon: <List className="h-4 w-4 mr-2" /> },
    { label: "Reports", href: "/provider/reports", icon: <BarChart className="h-4 w-4 mr-2" /> },
    { label: "Profile", href: "/profile", icon: <UserCircle className="h-4 w-4 mr-2" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  const adminMenuItems = [
    { label: "Dashboard", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { label: "Analytics", href: "/admin/analytics", icon: <BarChart className="h-4 w-4 mr-2" /> },
    { label: "Team", href: "/admin/team", icon: <Users className="h-4 w-4 mr-2" /> },
    { label: "Profile", href: "/profile", icon: <UserCircle className="h-4 w-4 mr-2" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  const getMenuItems = () => {
    if (!profile) return userMenuItems;
    
    switch (profile.role) {
      case "tradesperson":
        return tradespersonMenuItems;
      case "admin":
        return adminMenuItems;
      default:
        return userMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-card border-b hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                Eco-Fix Connect
              </Link>
              {user && (
                <div className="ml-10 flex items-center space-x-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-foreground hover:text-primary flex items-center px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "User"} />
                        <AvatarFallback>{profile?.full_name ? getInitials(profile.full_name) : "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{profile?.email || user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {menuItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link to={item.href} className="flex items-center cursor-pointer">
                          {item.icon}
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

      {/* Mobile Navigation */}
      <nav className="bg-card border-b md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary">
              Eco-Fix Connect
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="text-xl font-bold text-primary mb-2">Eco-Fix Connect</p>
                    {user && profile && (
                      <div className="flex items-center space-x-3 mb-6 mt-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "User"} />
                          <AvatarFallback>{profile?.full_name ? getInitials(profile.full_name) : "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{profile?.full_name || "User"}</p>
                          <p className="text-sm text-muted-foreground">{profile?.email || user.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    {user ? (
                      <>
                        {menuItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center py-3 px-3 rounded-md hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <div className="space-y-3 pt-4">
                        <Link
                          to="/login"
                          className="flex items-center justify-center w-full py-2 border border-input rounded-md hover:bg-accent"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center justify-center w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                  {user && (
                    <div className="border-t pt-4 mt-4">
                      <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
