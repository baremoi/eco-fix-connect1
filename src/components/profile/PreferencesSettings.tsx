
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PreferencesSettings() {
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
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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
