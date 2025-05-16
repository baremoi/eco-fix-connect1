
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";
import { api, UpdateProfileData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardProfile from "@/components/dashboard/DashboardProfile";

export default function Profile() {
  const { profile, updateProfile } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch profile data from API
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    onError: (error) => {
      toast.error("Failed to load profile data");
      console.error("Profile data loading error:", error);
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => api.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
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

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3 mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <DashboardProfile />
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

function SecuritySettings() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const passwordMutation = useMutation({
    mutationFn: (data: { currentPassword: string, newPassword: string }) => 
      api.changePassword(data),
    onSuccess: () => {
      toast.success("Password updated successfully");
      setIsChangingPassword(false);
      reset();
    },
    onError: (error) => {
      toast.error("Failed to update password");
      console.error("Password update error:", error);
    }
  });

  const onSubmitPassword = (data: { currentPassword: string, newPassword: string, confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    passwordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    });
  };

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const toggle2FAMutation = useMutation({
    mutationFn: () => is2FAEnabled ? api.disable2FA() : api.enable2FA(),
    onSuccess: () => {
      toast.success(is2FAEnabled ? "2FA disabled" : "2FA enabled");
      setIs2FAEnabled(!is2FAEnabled);
    },
    onError: (error) => {
      toast.error("Failed to update 2FA settings");
      console.error("2FA update error:", error);
    }
  });

  const handleToggle2FA = () => {
    toggle2FAMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isChangingPassword ? (
            <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password"
                  {...register("currentPassword", { required: "Current password is required" })} 
                />
                {errors.currentPassword && (
                  <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password"
                  {...register("newPassword", { 
                    required: "New password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" } 
                  })} 
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password"
                  })} 
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsChangingPassword(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={passwordMutation.isPending}>
                  {passwordMutation.isPending ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Updating
                    </>
                  ) : "Update Password"}
                </Button>
              </div>
            </form>
          ) : (
            <Button onClick={() => setIsChangingPassword(true)}>
              Change Password
            </Button>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{is2FAEnabled ? "Enabled" : "Disabled"}</p>
              <p className="text-sm text-muted-foreground">
                {is2FAEnabled 
                  ? "Your account is protected with two-factor authentication" 
                  : "Enable two-factor authentication for added security"}
              </p>
            </div>
            <Button onClick={handleToggle2FA} disabled={toggle2FAMutation.isPending}>
              {toggle2FAMutation.isPending ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : is2FAEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function PreferencesSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: true
  });

  const notificationsMutation = useMutation({
    mutationFn: (data: {email: boolean, marketing: boolean}) => 
      api.updateNotificationPreferences(data),
    onSuccess: () => {
      toast.success("Notification preferences updated");
    },
    onError: (error) => {
      toast.error("Failed to update notification preferences");
      console.error("Notifications update error:", error);
    }
  });

  const privacyMutation = useMutation({
    mutationFn: (data: {profileVisibility: boolean}) => 
      api.updatePrivacySettings(data),
    onSuccess: () => {
      toast.success("Privacy settings updated");
    },
    onError: (error) => {
      toast.error("Failed to update privacy settings");
      console.error("Privacy settings update error:", error);
    }
  });

  const handleNotificationChange = (field: 'email' | 'marketing', value: boolean) => {
    const updated = { ...notifications, [field]: value };
    setNotifications(updated);
    notificationsMutation.mutate(updated);
  };

  const handlePrivacyChange = (field: 'profileVisibility', value: boolean) => {
    const updated = { ...privacy, [field]: value };
    setPrivacy(updated);
    privacyMutation.mutate(updated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you would like to be notified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <input 
              id="email-notifications"
              type="checkbox" 
              className="rounded border-gray-300 text-primary focus:ring-primary" 
              checked={notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
            />
            <div>
              <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about your account activity, project updates, and messages.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <input 
              id="marketing-emails"
              type="checkbox" 
              className="rounded border-gray-300 text-primary focus:ring-primary"
              checked={notifications.marketing}
              onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
            />
            <div>
              <Label htmlFor="marketing-emails" className="font-medium">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive marketing emails about new features, services, and special offers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Manage how your information is shared
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            <input 
              id="profile-visibility"
              type="checkbox" 
              className="rounded border-gray-300 text-primary focus:ring-primary"
              checked={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.checked)}
            />
            <div>
              <Label htmlFor="profile-visibility" className="font-medium">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Allow other users to view your profile information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
