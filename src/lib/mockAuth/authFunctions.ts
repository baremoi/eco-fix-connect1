
// Authentication functions for the mock auth system
import { toast } from "sonner";
import { mockUsers, mockProfiles } from "./mockData";
import { UserRole, STORAGE_KEYS, MockUser, MockProfile } from "./types";

// Sign in function
export const signIn = async (
  email: string,
  password: string,
  setUser: (user: MockUser | null) => void,
  setProfile: (profile: MockProfile | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
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
export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: UserRole,
  setUser: (user: MockUser | null) => void,
  setProfile: (profile: MockProfile | null) => void,
  setIsLoading: (isLoading: boolean) => void
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
export const signOut = async (
  setUser: (user: MockUser | null) => void,
  setProfile: (profile: MockProfile | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
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
export const resetPassword = async (
  email: string,
  setIsLoading: (isLoading: boolean) => void
) => {
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
export const updatePassword = async (
  password: string,
  user: MockUser | null,
  setIsLoading: (isLoading: boolean) => void
) => {
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
export const refreshProfile = async (
  user: MockUser | null,
  setProfile: (profile: MockProfile | null) => void
) => {
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
