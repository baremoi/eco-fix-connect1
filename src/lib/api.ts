
import { authService } from "./auth";
import { supabaseService } from "./supabaseService";

const API_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = authService.getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    authService.logout();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

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
  getProfile: () => fetchWithAuth("/user/profile"),
  updateProfile: (data: UpdateProfileData) => 
    fetchWithAuth("/user/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  
  // Avatar upload
  uploadAvatar: async (file: File) => {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");
    
    try {
      const publicUrl = await supabaseService.uploadAvatar(user.id, file);
      
      // Update the user profile with the new avatar URL
      await api.updateProfile({ avatar_url: publicUrl });
      
      return publicUrl;
    } catch (error) {
      console.error("Avatar upload error:", error);
      throw error;
    }
  },
  
  // Security
  changePassword: (data: ChangePasswordData) =>
    fetchWithAuth("/user/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  enable2FA: () => fetchWithAuth("/user/2fa/enable", { method: "POST" }),
  disable2FA: () => fetchWithAuth("/user/2fa/disable", { method: "POST" }),
  verify2FAToken: (token: string) =>
    fetchWithAuth("/user/2fa/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    }),

  // Account Management
  deleteAccount: () => fetchWithAuth("/user/account", { method: "DELETE" }),

  // Notifications
  updateNotificationPreferences: (preferences: UpdateProfileData["notifications"]) =>
    fetchWithAuth("/user/notifications", {
      method: "PATCH",
      body: JSON.stringify(preferences),
    }),

  // Privacy
  updatePrivacySettings: (settings: UpdateProfileData["privacy"]) =>
    fetchWithAuth("/user/privacy", {
      method: "PATCH",
      body: JSON.stringify(settings),
    }),
}; 
