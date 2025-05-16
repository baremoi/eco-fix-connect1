
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

type ProfileSectionProps = {
  user: User | null;
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
  
  return (
    <div className={`p-4 border-t ${mobile ? 'border-border mt-4' : 'border-sidebar-border'}`}>
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
          className={`ml-auto ${!mobile ? 'h-8 w-8 p-0' : ''}`}
          size={mobile ? "icon" : undefined}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Sign out</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;

