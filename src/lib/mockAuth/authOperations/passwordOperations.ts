
import { MockUser } from '../types';
import { mockUsers, delay } from '../mockDatabase';
import { toast } from 'sonner';

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
