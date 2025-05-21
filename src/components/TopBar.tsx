
import { ProfileSection } from "./navigation/ProfileSection";
import { useMockAuth } from "@/lib/mockAuth";

export default function TopBar() {
  const { user, profile, signOut } = useMockAuth();

  return (
    <div className="h-16 border-b border-border bg-background flex items-center justify-end px-4">
      <div className="max-w-[240px]">
        <ProfileSection 
          user={user} 
          profile={profile} 
          logout={signOut}
          topRight={true}
          showSettings={true}
        />
      </div>
    </div>
  );
}
