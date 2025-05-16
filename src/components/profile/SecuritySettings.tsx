
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Icons } from "@/components/ui/icons";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";

export function SecuritySettings() {
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
    onError: (error: Error) => {
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
    onError: (error: Error) => {
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
                  <p className="text-sm text-red-500">{errors.currentPassword.message as string}</p>
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
                  <p className="text-sm text-red-500">{errors.newPassword.message as string}</p>
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
                  <p className="text-sm text-red-500">{errors.confirmPassword.message as string}</p>
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
