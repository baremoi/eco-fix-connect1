
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function PreferencesSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    appUpdates: true,
    serviceAlerts: true
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    activityTracking: true,
    dataSharing: false
  });

  const notificationsMutation = useMutation({
    mutationFn: (data: any) => 
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
    mutationFn: (data: any) => 
      api.updatePrivacySettings(data),
    onSuccess: () => {
      toast.success("Privacy settings updated");
    },
    onError: (error: Error) => {
      toast.error("Failed to update privacy settings");
      console.error("Privacy settings update error:", error);
    }
  });

  const handleNotificationChange = (field: string, value: boolean) => {
    const updated = { ...notifications, [field]: value };
    setNotifications(updated);
    notificationsMutation.mutate(updated);
  };

  const handlePrivacyChange = (field: string, value: boolean) => {
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
            Choose how and when you would like to be notified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about your account activity
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive marketing emails about special offers
              </p>
            </div>
            <Switch 
              id="marketing-emails"
              checked={notifications.marketing}
              onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-updates">App Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about new features and app updates
              </p>
            </div>
            <Switch 
              id="app-updates"
              checked={notifications.appUpdates}
              onCheckedChange={(checked) => handleNotificationChange('appUpdates', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="service-alerts">Service Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notifications about service status and maintenance
              </p>
            </div>
            <Switch 
              id="service-alerts"
              checked={notifications.serviceAlerts}
              onCheckedChange={(checked) => handleNotificationChange('serviceAlerts', checked)}
            />
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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Allow other users to view your profile information
              </p>
            </div>
            <Switch
              id="profile-visibility"
              checked={privacy.profileVisibility}
              onCheckedChange={(checked) => handlePrivacyChange('profileVisibility', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="activity-tracking">Activity Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to collect data to improve your experience
              </p>
            </div>
            <Switch
              id="activity-tracking"
              checked={privacy.activityTracking}
              onCheckedChange={(checked) => handlePrivacyChange('activityTracking', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-sharing">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Share your usage data with our partners
              </p>
            </div>
            <Switch
              id="data-sharing"
              checked={privacy.dataSharing}
              onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
