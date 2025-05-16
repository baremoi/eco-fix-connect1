
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { ProfileForm } from "@/components/shared/ProfileForm";
import { ProfileAvatar } from "@/components/shared/ProfileAvatar";
import { useProfileFormState } from "./profile/useProfileFormState";

const DashboardProfile = () => {
  const { profile: authProfile } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch profile data with fixed error handling
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    meta: {
      onError: () => {
        toast.error("Failed to load profile data");
      }
    }
  });

  const defaultProfile = {
    name: authProfile?.full_name || "",
    email: authProfile?.email || "",
    phone: "",
    address: "",
    bio: "",
    avatar: "/placeholder-avatar.jpg"
  };

  const [profile, setProfile] = useState(defaultProfile);

  // Update profile when data is loaded
  useEffect(() => {
    if (profileData) {
      const data = profileData as any;
      setProfile({
        name: data.name || defaultProfile.name,
        email: data.email || defaultProfile.email,
        phone: data.phone || defaultProfile.phone,
        address: data.address || defaultProfile.address,
        bio: data.bio || defaultProfile.bio,
        avatar: data.avatar_url || defaultProfile.avatar
      });
    }
  }, [profileData]);

  const {
    isEditing,
    setIsEditing,
    avatarPreview,
    updateProfileMutation,
    register,
    handleSubmit,
    errors,
    handleCancel,
    handleFileChange,
    onSubmit
  } = useProfileFormState({
    profile,
    setProfile,
    queryClient
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <ProfileAvatar 
                avatarUrl={profile.avatar}
                avatarPreview={avatarPreview}
                userName={profile.name}
                isEditing={isEditing}
                onFileChange={handleFileChange}
              />
              
              <div className="flex-grow space-y-4">
                <ProfileForm
                  isEditing={isEditing}
                  defaultValues={profile}
                  register={register}
                  errors={errors}
                />
                
                <div className="flex justify-end space-x-2 pt-4">
                  {isEditing ? (
                    <>
                      <button 
                        type="button" 
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                          </>
                        ) : "Save Changes"}
                      </button>
                    </>
                  ) : (
                    <button 
                      type="button"
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                      onClick={() => setIsEditing(true)}
                    >
                      <Icons.edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardProfile;
