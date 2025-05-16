
import { supabaseService } from "./supabaseService";
import supabase from "./supabase";

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar_url?: string;
  notifications?: {
    email: boolean;
    marketing: boolean;
  };
  privacy?: {
    profileVisibility: boolean;
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const api = {
  // User Profile
  getProfile: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    
    const { data, error } = await supabaseService.getUserProfile(session.user.id);
    if (error) throw error;
    return data;
  },
  
  updateProfile: async (data: UpdateProfileData) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    
    // Map the input data to the database structure expected by Supabase profiles table
    const profileUpdate = {
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bio: data.bio,
      avatar_url: data.avatar_url
    };
    
    const { data: updatedProfile, error } = await supabaseService.updateUserProfile(
      session.user.id, 
      profileUpdate
    );
    
    if (error) {
      console.error("Profile update error:", error);
      throw error;
    }
    
    return updatedProfile;
  },
  
  // Avatar upload
  uploadAvatar: async (file: File) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("User not authenticated");
    
    try {
      const publicUrl = await supabaseService.uploadAvatar(session.user.id, file);
      
      // Return the URL without calling updateProfile here
      // The component will handle the profile update separately
      return publicUrl;
    } catch (error) {
      console.error("Avatar upload error:", error);
      throw error;
    }
  },
  
  // Security
  changePassword: async (data: ChangePasswordData) => {
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword
    });
    
    if (error) throw error;
    return { success: true };
  },
  
  // Account Management
  deleteAccount: async () => {
    // This would require a custom endpoint or admin privileges
    throw new Error("Not implemented - requires server-side implementation");
  },

  // Notifications
  updateNotificationPreferences: async (preferences: UpdateProfileData["notifications"]) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    
    // This would typically store to a separate notifications table
    // This is a stub implementation
    return { success: true, preferences };
  },

  // Privacy
  updatePrivacySettings: async (settings: UpdateProfileData["privacy"]) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    
    // This would typically store to a separate privacy_settings table
    // This is a stub implementation
    return { success: true, settings };
  },
}; 
