
import { createContext, useContext, useEffect, useState } from "react";
import { MockUser, MockProfile, MockAuthContextType } from "./types";
import { signIn, signUp, signOut, resetPassword, updatePassword, refreshProfile } from "./authFunctions";

const MockAuthContext = createContext<MockAuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  refreshProfile: () => Promise.resolve(),
});

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recover session from localStorage if it exists
    try {
      const storedUser = localStorage.getItem('mock_auth_user');
      const storedProfile = localStorage.getItem('mock_auth_profile');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Error loading stored auth data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const value: MockAuthContextType = {
    user,
    profile,
    isLoading,
    signIn: async (email: string, password: string) => {
      await signIn(email, password, setUser, setProfile, setIsLoading);
    },
    signUp: async (email: string, password: string, name: string, role: "user" | "tradesperson" | "admin") => {
      await signUp(email, password, name, role, setUser, setProfile, setIsLoading);
    },
    signOut: async () => {
      await signOut(setUser, setProfile, setIsLoading);
    },
    resetPassword: async (email: string) => {
      await resetPassword(email, setIsLoading);
    },
    updatePassword: async (password: string) => {
      await updatePassword(password, user, setIsLoading);
    },
    refreshProfile: async () => {
      await refreshProfile(user, setProfile);
    }
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export const useMockAuth = () => useContext(MockAuthContext);
