
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "../shared/ProfileAvatar";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type ProfileSectionProps = {
  user: SupabaseUser | null;
  profile: any;
  logout: () => void;
  topRight?: boolean;
  showSettings?: boolean;
};

export function ProfileSection({ 
  user, 
  profile, 
  logout, 
  topRight = false,
  showSettings = false
}: ProfileSectionProps) {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.full_name || user?.email || "User");
      setRole(profile.role || null);
    } else if (user?.email) {
      setDisplayName(user.email);
      setRole(null);
    }
  }, [profile, user]);

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    );
  }

  if (topRight && window.innerWidth < 768) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "relative h-8 w-8 rounded-full",
              topRight ? "w-full justify-end" : "w-auto"
            )}
          >
            <ProfileAvatar user={user} profile={profile} />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          {showSettings && (
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "relative h-8 flex items-center space-x-2 rounded-full",
            topRight ? "w-full justify-end" : "w-auto"
          )}
        >
          <div className="flex items-center gap-2 max-w-[180px]">
            <div className="flex-shrink-0">
              <ProfileAvatar user={user} profile={profile} />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              {role && <p className="text-xs text-muted-foreground capitalize">{role}</p>}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        {showSettings && (
          <DropdownMenuItem asChild>
            <Link to="/profile">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
