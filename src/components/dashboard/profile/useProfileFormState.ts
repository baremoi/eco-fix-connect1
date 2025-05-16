
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { api, UpdateProfileData } from "@/lib/api";

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

interface ProfileState {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar: string;
}

interface UseProfileFormStateProps {
  profile: ProfileState;
  setProfile: (profile: ProfileState) => void;
  queryClient: QueryClient;
}

export const useProfileFormState = ({ profile, setProfile, queryClient }: UseProfileFormStateProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
  const handleFileChange = (file: File) => {
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // TODO: In a real implementation, you would upload the file here
    console.log("File selected for upload:", file.name);
  };

  // Handle form submission
  const onSubmit = (data: ProfileFormValues) => {
    // Prepare update data
    const updateData: UpdateProfileData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio
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

  return {
    isEditing,
    setIsEditing,
    avatarPreview,
    updateProfileMutation,
    register,
    handleSubmit,
    errors,
    reset,
    handleCancel,
    handleFileChange,
    onSubmit
  };
};
