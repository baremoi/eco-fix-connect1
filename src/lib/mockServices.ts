
import { toast } from "sonner";

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: 'mock_user_profile',
  BOOKINGS: 'mock_bookings',
  PROJECTS: 'mock_projects',
  SERVICES: 'mock_services',
  REVIEWS: 'mock_reviews'
};

// Helper to get data from localStorage
const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper to save data to localStorage
const saveStoredData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Types
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

// Mock API service
export const mockApi = {
  // User Profile
  getProfile: async () => {
    console.log("Mock getProfile called");
    // Use the session data from the mock auth
    const storedProfile = localStorage.getItem('mock_profile');
    if (!storedProfile) {
      throw new Error("Not authenticated");
    }
    
    return JSON.parse(storedProfile);
  },
  
  updateProfile: async (data: UpdateProfileData) => {
    console.log("Mock updateProfile called with:", data);
    const storedProfile = localStorage.getItem('mock_profile');
    if (!storedProfile) {
      throw new Error("Not authenticated");
    }
    
    const profile = JSON.parse(storedProfile);
    const updatedProfile = {
      ...profile,
      full_name: data.name ?? profile.full_name,
      email: data.email ?? profile.email,
      phone: data.phone ?? profile.phone,
      address: data.address ?? profile.address,
      bio: data.bio ?? profile.bio,
      avatar_url: data.avatar_url ?? profile.avatar_url,
      updated_at: new Date().toISOString()
    };
    
    localStorage.setItem('mock_profile', JSON.stringify(updatedProfile));
    
    return updatedProfile;
  },
  
  // Avatar upload
  uploadAvatar: async (file: File) => {
    console.log("Mock uploadAvatar called with file:", file.name);
    
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate a delay for the upload process
        setTimeout(() => {
          // Return the data URL as the avatar URL
          resolve(reader.result as string);
        }, 1000);
      };
      reader.readAsDataURL(file);
    });
  },
  
  // Security
  changePassword: async (data: ChangePasswordData) => {
    console.log("Mock changePassword called");
    // Simulate password change
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  },
  
  // Two-Factor Authentication (2FA) methods
  enable2FA: async () => {
    console.log("Mock enable2FA called");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: "2FA enabled successfully (mock)" };
  },
  
  disable2FA: async () => {
    console.log("Mock disable2FA called");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: "2FA disabled successfully (mock)" };
  },
  
  // Account Management
  deleteAccount: async () => {
    console.log("Mock deleteAccount called");
    toast.error("Account deletion is not implemented in mock version");
    throw new Error("Not implemented - requires server-side implementation");
  },

  // Notifications
  updateNotificationPreferences: async (preferences: UpdateProfileData["notifications"]) => {
    console.log("Mock updateNotificationPreferences called with:", preferences);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, preferences };
  },

  // Privacy
  updatePrivacySettings: async (settings: UpdateProfileData["privacy"]) => {
    console.log("Mock updatePrivacySettings called with:", settings);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true, settings };
  },
};
