
import { MockUser, MockProfile, UserRole, STORAGE_KEYS } from './types';
import { toast } from 'sonner';

// Mock user database
const mockUsers: Record<string, { user: MockUser; profile: MockProfile; password: string }> = {
  'admin@example.com': {
    user: { id: 'admin-1', email: 'admin@example.com', createdAt: new Date().toISOString() },
    profile: { id: 'admin-1', full_name: 'Admin User', role: 'admin' },
    password: 'password123',
  },
  'user@example.com': {
    user: { id: 'user-1', email: 'user@example.com', createdAt: new Date().toISOString() },
    profile: { id: 'user-1', full_name: 'Regular User', role: 'user' },
    password: 'password123',
  },
  'provider@example.com': {
    user: { id: 'provider-1', email: 'provider@example.com', createdAt: new Date().toISOString() },
    profile: { id: 'provider-1', full_name: 'Service Provider', role: 'tradesperson' },
    password: 'password123',
  },
};

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Sign in function
export const signIn = async (
  email: string,
  password: string,
  setUser: (user: MockUser | null) => void,
  setProfile: (profile: MockProfile | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);
  
  try {
    // Simulate network delay
    await delay(1000);
    
    const lowercaseEmail = email.toLowerCase();
    const userData = mockUsers[lowercaseEmail];
    
    if (!userData || userData.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Set user and profile data
    const { user, profile } = userData;
    
    // Store in localStorage for persistence
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    
    setUser(user);
    setProfile(profile);
    
    toast.success(`Welcome back, ${profile.full_name}`);
    return { user, profile };
  } catch (error) {
    toast.error((error as Error).message);
    throw error;
  } finally {
    setIsLoading(false);
  }
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
  setIsLoading(true);
  
  try {
    // Simulate network delay
    await delay(1000);
    
    const lowercaseEmail = email.toLowerCase();
    
    // Check if user already exists
    if (mockUsers[lowercaseEmail]) {
      throw new Error('Email already in use');
    }
    
    // Create new user and profile
    const id = `user-${Math.random().toString(36).substr(2, 9)}`;
    const user: MockUser = {
      id,
      email: lowercaseEmail,
      createdAt: new Date().toISOString()
    };
    
    const profile: MockProfile = {
      id,
      full_name: name,
      role
    };
    
    // Add to mock database
    mockUsers[lowercaseEmail] = { user, profile, password };
    
    // Store in localStorage for persistence
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    
    setUser(user);
    setProfile(profile);
    
    toast.success('Account created successfully');
    return { user, profile };
  } catch (error) {
    toast.error((error as Error).message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// Sign out function
export const signOut = async (
  setUser: (user: MockUser | null) => void,
  setProfile: (profile: MockProfile | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);
  
  try {
    // Simulate network delay
    await delay(500);
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    
    // Clear state
    setUser(null);
    setProfile(null);
    
    toast.success('Logged out successfully');
  } catch (error) {
    toast.error((error as Error).message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// Reset password function (mock implementation)
export const resetPassword = async (
  email: string,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);
  
  try {
    // Simulate network delay
    await delay(1000);
    
    const lowercaseEmail = email.toLowerCase();
    
    // Check if user exists
    if (!mockUsers[lowercaseEmail]) {
      // For security reasons, don't reveal if email exists or not
      toast.success('If an account with this email exists, a password reset link has been sent');
      return;
    }
    
    // In a real implementation, you would send an email with a reset link
    toast.success('Password reset link sent to your email');
  } catch (error) {
    toast.error((error as Error).message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// Update password function (mock implementation)
export const updatePassword = async (
  password: string,
  user: MockUser | null,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);
  
  try {
    if (!user) {
      throw new Error('You must be logged in to update your password');
    }
    
    // Simulate network delay
    await delay(1000);
    
    // Update password in mock database
    const userData = Object.values(mockUsers).find(u => u.user.id === user.id);
    if (userData) {
      userData.password = password;
    }
    
    toast.success('Password updated successfully');
  } catch (error) {
    toast.error((error as Error).message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// Refresh profile function
export const refreshProfile = async (
  user: MockUser | null,
  setProfile: (profile: MockProfile | null) => void
) => {
  if (!user) return;
  
  try {
    // Find user data from email
    const userData = Object.values(mockUsers).find(u => u.user.id === user.id);
    if (userData) {
      setProfile(userData.profile);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userData.profile));
    }
  } catch (error) {
    console.error('Error refreshing profile:', error);
  }
};
