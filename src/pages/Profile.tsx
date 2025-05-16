
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Icons } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";

// Import refactored components
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { PreferencesSettings } from "@/components/profile/PreferencesSettings";

export default function Profile() {
  const { profile: authProfile } = useAuth();
  
  // Fetch profile data from API with proper error handling
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    meta: {
      onError: (error: Error) => {
        toast.error("Failed to load profile data");
        console.error("Profile data loading error:", error);
      }
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings
        </p>
      </div>

      <Tabs defaultValue="personalInfo" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3 mb-6">
          <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personalInfo">
          <PersonalInfo profileData={profileData} authProfile={authProfile} />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
