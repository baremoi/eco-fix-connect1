
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Icons } from "@/components/ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";

interface PersonalInfoProps {
  profileData: any;
  authProfile: any;
}

export function PersonalInfo({ profileData, authProfile }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  
  const defaultProfile = {
    name: authProfile?.full_name || "",
    email: authProfile?.email || "",
    phone: profileData?.phone || "",
    address: profileData?.address || "",
    bio: profileData?.bio || "",
    avatar_url: profileData?.avatar_url || "/placeholder-avatar.jpg"
  };

  // Form setup
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: defaultProfile
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => api.updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: Error) => {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    }
  });

  // Avatar upload mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => api.uploadAvatar(file),
    onSuccess: (avatarUrl) => {
      toast.success("Profile photo updated successfully");
      setAvatarPreview(null);
      setAvatarFile(null);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: Error) => {
      toast.error("Failed to upload profile photo");
      console.error("Avatar upload error:", error);
    }
  });

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    // Start with avatar upload if a new file was selected
    if (avatarFile) {
      setIsUploading(true);
      try {
        await uploadAvatarMutation.mutateAsync(avatarFile);
      } catch (error) {
        // Error is handled by the mutation
      } finally {
        setIsUploading(false);
      }
    }

    // Prepare update data
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio,
    };

    // Update profile
    updateProfileMutation.mutate(updateData);
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    setAvatarFile(null);
    reset(defaultProfile);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and profile photo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <div className="flex flex-col items-center space-y-3 mb-6 md:mb-0">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={avatarPreview || defaultProfile.avatar_url} 
                  alt={defaultProfile.name} 
                />
                <AvatarFallback>
                  {defaultProfile.name.split(' ').map((n: string) => n[0]).join('')}
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
                        <p className="text-sm text-red-500">{errors.name.message as string}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-lg">{defaultProfile.name}</p>
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
                        <p className="text-sm text-red-500">{errors.email.message as string}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-lg">{defaultProfile.email}</p>
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
                        <p className="text-sm text-red-500">{errors.phone.message as string}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-lg">{defaultProfile.phone || "Not provided"}</p>
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
                        <p className="text-sm text-red-500">{errors.address.message as string}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-lg">{defaultProfile.address || "Not provided"}</p>
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
                      <p className="text-sm text-red-500">{errors.bio.message as string}</p>
                    )}
                  </>
                ) : (
                  <p className="text-lg whitespace-pre-wrap">
                    {defaultProfile.bio || "No bio provided yet."}
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
                      disabled={updateProfileMutation.isPending || isUploading}
                    >
                      {(updateProfileMutation.isPending || isUploading) ? (
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
  );
}
