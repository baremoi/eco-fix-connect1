
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseProfileFormProps {
  profileData: any;
  authProfile: any;
}

export function useProfileForm({ profileData, authProfile }: UseProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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
    onSuccess: (publicUrl) => {
      toast.success("Profile photo updated successfully");
      // After successful upload, update the profile with the new avatar URL
      updateProfileMutation.mutate({ avatar_url: publicUrl });
      setAvatarFile(null);
    },
    onError: (error: Error) => {
      toast.error("Failed to upload profile photo");
      console.error("Avatar upload error:", error);
    }
  });

  const handleFileChange = (file: File) => {
    setAvatarFile(file);
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
    } else {
      // If no avatar upload, just update the profile
      const updateData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bio: data.bio,
      };

      // Update profile
      updateProfileMutation.mutate(updateData);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    reset(defaultProfile);
  };

  return {
    isEditing,
    setIsEditing,
    avatarFile,
    isUploading: isUploading || updateProfileMutation.isPending,
    defaultProfile,
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    handleFileChange
  };
}
