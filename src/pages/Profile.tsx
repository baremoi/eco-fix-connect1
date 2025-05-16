
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Icons } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect } from "react";

// Import refactored components
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { PreferencesSettings } from "@/components/profile/PreferencesSettings";
import { ThemeSettings } from "@/components/profile/ThemeSettings";
import { AccessibilitySettings } from "@/components/profile/AccessibilitySettings";

export default function Profile() {
  const { profile: authProfile } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data from API with proper error handling
  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await api.getProfile();
        setProfileData(data);
        console.log("Profile data loaded:", data);
      } catch (error) {
        console.error("Error loading profile data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProfileData();
  }, []);

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
