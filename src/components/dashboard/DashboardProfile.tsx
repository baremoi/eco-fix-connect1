
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, UpdateProfileData } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar_url?: string;
}

const DashboardProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  // Remove unused avatarFile state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { profile: authProfile } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch profile data with fixed error handling
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    // Move error handling to meta property
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
      const data = profileData as ProfileData;
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

  // Form setup
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormValues>({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      bio: profile.bio
    }
  });

  // Update form values when profile changes
  useEffect(() => {
    reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      bio: profile.bio
    });
  }, [profile, reset]);

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => api.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    }
  });

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Store file for upload implementation
      const fileData = file; // Use this when implementing file upload
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = (data: ProfileFormValues) => {
    // Prepare update data
    const updateData: UpdateProfileData = {
      name: data.name,
      email: data.email,
    };

    // Update profile
    updateProfileMutation.mutate(updateData);
    
    // Update local state
    setProfile({
      ...profile,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      bio: profile.bio
    });
  };

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
              <div className="flex flex-col items-center space-y-3 mb-6 md:mb-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={avatarPreview || profile.avatar} 
                    alt={profile.name} 
                  />
                  <AvatarFallback>
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <div className="flex flex-col items-center">
                    <Label htmlFor="avatar" className="cursor-pointer text-sm text-primary">
                      Change Photo
                    </Label>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex-grow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="name"
                          {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-lg">{profile.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="email"
                          type="email"
                          {...register("email", { 
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          })}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-lg">{profile.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="phone"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone.message}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-lg">{profile.phone || "Not provided"}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <>
                        <Input
                          id="address"
                          {...register("address")}
                        />
                        {errors.address && (
                          <p className="text-sm text-red-500">{errors.address.message}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-lg">{profile.address || "Not provided"}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <>
                      <Textarea
                        id="bio"
                        {...register("bio")}
                        rows={4}
                        placeholder="Tell us a little about yourself..."
                      />
                      {errors.bio && (
                        <p className="text-sm text-red-500">{errors.bio.message}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-lg whitespace-pre-wrap">
                      {profile.bio || "No bio provided yet."}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  {isEditing ? (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                          </>
                        ) : "Save Changes"}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Icons.edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
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
