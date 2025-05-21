
import { MockUser, MockProfile } from '../types';
import { delay } from '../mockDatabase';
import { clearUserData } from '../utils';
import { toast } from 'sonner';

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
    clearUserData();
    
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
