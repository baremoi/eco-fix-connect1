
// This file contains a mock implementation of authentication for demonstration purposes
// In a real application, you would use Supabase Auth or another authentication provider

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

// Define types for our mock auth context
export type UserRole = "user" | "tradesperson" | "admin";

interface MockUser {
  id: string;
  email: string;
  created_at: string;
}

interface MockProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface MockAuthContextType {
  user: MockUser | null;
  profile: MockProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Mock user data
const mockUsers = [
  {
    id: "user-1",
    email: "user@example.com",
    password: "password",
    created_at: new Date().toISOString(),
  },
  {
    id: "provider-1",
    email: "provider@example.com",
    password: "password",
    created_at: new Date().toISOString(),
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "password",
    created_at: new Date().toISOString(),
  },
];

// Mock profiles data
const mockProfiles = [
  {
    id: "user-1",
    full_name: "Demo User",
    email: "user@example.com",
    role: "user" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: "/avatars/user.jpg",
  },
  {
    id: "provider-1",
    full_name: "Demo Provider",
    email: "provider@example.com",
    role: "tradesperson" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: "/avatars/provider.jpg",
  },
  {
    id: "admin-1",
    full_name: "Demo Admin",
    email: "admin@example.com",
    role: "admin" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    avatar_url: "/avatars/admin.jpg",
  },
];

// Create the auth context
const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

// Storage keys for mock auth
const STORAGE_KEYS = {
  USER: "mock_user",
  PROFILE: "mock_profile",
};

// Mock Auth Provider
export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage (simulating persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    setIsLoading(false);
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    console.log("Mock signIn called with:", email);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Create a sanitized user object (without password)
      const sanitizedUser = {
        id: foundUser.id,
        email: foundUser.email,
        created_at: foundUser.created_at,
      };

      // Find the corresponding profile
      const foundProfile = mockProfiles.find((p) => p.id === foundUser.id);

      // Store in state and localStorage
      setUser(sanitizedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(sanitizedUser));

      if (foundProfile) {
        setProfile(foundProfile);
        localStorage.setItem(
          STORAGE_KEYS.PROFILE,
          JSON.stringify(foundProfile)
        );
      }

      toast.success("Signed in successfully");
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }

    setIsLoading(false);
  };

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    console.log("Mock signUp called with:", email, name, role);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      toast.error("User already exists with this email");
      setIsLoading(false);
      throw new Error("User already exists with this email");
    }

    // Create new user ID
    const newId = `user-${Date.now()}`;

    // Create new user and profile
    const newUser = {
      id: newId,
      email,
      password, // In a real app, this would be hashed
      created_at: new Date().toISOString(),
    };

    const newProfile = {
      id: newId,
      full_name: name,
      email,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add to mock data (in a real app, this would be saved to a database)
    mockUsers.push(newUser);
    mockProfiles.push(newProfile);

    // Create a sanitized user object (without password)
    const sanitizedUser = {
      id: newUser.id,
      email: newUser.email,
      created_at: newUser.created_at,
    };

    // Store in state and localStorage
    setUser(sanitizedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(sanitizedUser));
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));

    toast.success("Account created successfully");
    setIsLoading(false);
  };

  // Sign out function
  const signOut = async () => {
    console.log("Mock signOut called");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Clear state and localStorage
    setUser(null);
    setProfile(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);

    toast.success("Signed out successfully");
    setIsLoading(false);
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    console.log("Mock resetPassword called for:", email);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser) {
      toast.success("Password reset link sent to your email");
    } else {
      toast.error("No account found with this email");
      throw new Error("No account found with this email");
    }

    setIsLoading(false);
  };

  // Update password function
  const updatePassword = async (password: string) => {
    console.log("Mock updatePassword called");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (user) {
      // In a real app, this would update the password in the database
      const userIndex = mockUsers.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex].password = password;
        toast.success("Password updated successfully");
      }
    } else {
      toast.error("You must be logged in to update your password");
      throw new Error("Not authenticated");
    }

    setIsLoading(false);
  };

  // Refresh profile function
  const refreshProfile = async () => {
    console.log("Mock refreshProfile called");
    
    if (!user) {
      console.log("Cannot refresh profile: no user logged in");
      return;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find the corresponding profile
    const foundProfile = mockProfiles.find((p) => p.id === user.id);

    if (foundProfile) {
      setProfile(foundProfile);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(foundProfile));
      console.log("Profile refreshed:", foundProfile);
    } else {
      console.log("No profile found for user:", user.id);
    }
  };

  return (
    <MockAuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        refreshProfile,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

// Hook to use the auth context
export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
}
