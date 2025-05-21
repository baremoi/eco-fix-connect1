
import { MockUser, MockProfile } from '../types';
import { mockUsers } from '../mockDatabase';
import { storeUserData } from '../utils';

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
      localStorage.setItem('mock_auth_profile', JSON.stringify(userData.profile));
    }
  } catch (error) {
    console.error('Error refreshing profile:', error);
  }
};
