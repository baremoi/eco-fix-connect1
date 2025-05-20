
import { toast } from "sonner";
import { mockApi } from "@/lib/mockServices";
import { Icons } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMockAuth } from "@/lib/mockAuth";
import { useState, useEffect } from "react";

// Import refactored components
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { PreferencesSettings } from "@/components/profile/PreferencesSettings";
import { ThemeSettings } from "@/components/profile/ThemeSettings";
import { AccessibilitySettings } from "@/components/profile/AccessibilitySettings";

export default function Profile() {
  const { profile: authProfile, user } = useMockAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any | null>(null);

  console.log("Profile component rendering", { authProfile, user });

  // Fetch profile data from API with proper error handling
  useEffect(() => {
    async function fetchProfileData() {
      try {
        // First check if we already have the profile from AuthContext
        if (authProfile) {
          console.log("Using profile from auth context:", authProfile);
          setProfileData(authProfile);
          setIsLoading(false);
          return;
        }
        
        // If not, fetch it
        if (user) {
          console.log("Fetching profile data for user:", user.id);
          const data = await mockApi.getProfile();
          console.log("Profile data loaded:", data);
          setProfileData(data);
        } else {
          console.log("No user found, can't fetch profile");
          toast.error("User not found");
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProfileData();
  }, [authProfile, user]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If we still don't have profile data after loading
  if (!profileData && !isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find your profile information. Please try refreshing the page.
          </p>
          <button 
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information, account settings, and preferences
        </p>
      </div>

      <Tabs defaultValue="personalInfo" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="personalInfo">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
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

        <TabsContent value="theme">
          <ThemeSettings />
        </TabsContent>

        <TabsContent value="accessibility">
          <AccessibilitySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
