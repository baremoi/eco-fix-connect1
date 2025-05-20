
import { ProfileSection } from "./navigation/ProfileSection";
import { User } from "@supabase/supabase-js";

type TopBarProps = {
  user: User | null;
  profile: any;
  logout: () => void;
};

export default function TopBar({ user, profile, logout }: TopBarProps) {
  return (
    <div className="h-16 border-b border-border bg-background flex items-center justify-end px-4">
      <div className="max-w-[240px]">
        <ProfileSection 
          user={user} 
          profile={profile} 
          logout={logout}
          topRight={true}
          showSettings={true}
        />
      </div>
    </div>
  );
}
