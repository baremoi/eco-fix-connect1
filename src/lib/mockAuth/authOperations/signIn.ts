
import { MockUser, MockProfile } from '../types';
import { mockUsers, delay } from '../mockDatabase';
import { storeUserData } from '../utils';
import { toast } from 'sonner';

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
    storeUserData(user, profile);
    
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
