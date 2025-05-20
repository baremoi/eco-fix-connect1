import { LogOut, ChevronDown, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";

type ProfileSectionProps = {
  user: SupabaseUser | null;
  profile: any; // Using any for simplicity, but ideally should use a proper type
  logout: () => void;
  mobile?: boolean;
  onCloseSheet?: () => void;
};

export const ProfileSection = ({ 
  user, 
  profile, 
  logout, 
  mobile = false, 
  onCloseSheet 
}: ProfileSectionProps) => {
  const [open, setOpen] = useState(false);
  
  if (!user || !profile) return null;
  
  // Extract first name from full name or use first part of email
  const firstName = profile.full_name
    ? profile.full_name.split(' ')[0]
    : user.email?.split('@')[0];
  
  const handleLogout = () => {
    logout();
    if (mobile && onCloseSheet) {
      onCloseSheet();
    }
  };
  
  // For mobile view, we'll keep the existing layout
  if (mobile) {
    return (
      <div className="p-4 border-t border-border mt-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback>
              {profile.full_name?.charAt(0) || user.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {firstName}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-28">
              {user.email}
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="ml-auto"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    );
  }
  
  // For desktop view, we'll use the dropdown menu
  return (
    <div className="p-4 border-t border-sidebar-border">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center px-2 h-auto py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback>
                  {profile.full_name?.charAt(0) || user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                  {firstName}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-28">
                  {user.email}
                </span>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            {profile.full_name || 'User'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileSection;
