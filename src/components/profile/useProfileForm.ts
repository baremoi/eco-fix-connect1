
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { mockApi } from "@/lib/mockServices"; // Use the mock API

// Define schema for profile form validation
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UseProfileFormProps {
  profileData: any;
  authProfile: any;
}

export function useProfileForm({ profileData, authProfile }: UseProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Prepare the default values for the form based on profile data
  const defaultProfile = {
    name: profileData?.full_name || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    address: profileData?.address || "",
    bio: profileData?.bio || "",
    avatar_url: profileData?.avatar_url || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfile,
  });

  // Function to handle form submission
  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsUploading(true);

      // Map form data to the expected API format
      const profileUpdate = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bio: data.bio,
        avatar_url: avatarPreview || defaultProfile.avatar_url,
      };

      // Update profile with mock API
      await mockApi.updateProfile(profileUpdate);

      // Success message
      toast.success("Profile updated successfully");

      // Exit editing mode
      setIsEditing(false);
      setAvatarPreview(null);

    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle file change for avatar upload
  const handleFileChange = async (file: File) => {
    try {
      setIsUploading(true);

      // Use mock API to upload avatar
      const avatarUrl = await mockApi.uploadAvatar(file);
      setAvatarPreview(avatarUrl);

    } catch (error: any) {
      console.error("Avatar upload error:", error);
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  // Function to handle cancel button
  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    reset(defaultProfile); // Reset form to default values
  };

  return {
    isEditing,
    setIsEditing,
    isUploading,
    defaultProfile,
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    handleFileChange,
    avatarPreview,
  };
}
