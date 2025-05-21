
import { MockUser, MockProfile, UserRole } from '../types';
import { mockUsers, delay } from '../mockDatabase';
import { storeUserData } from '../utils';
import { toast } from 'sonner';

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
    storeUserData(user, profile);
    
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
