
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MockUser, MockProfile } from './types';
import { signIn, signOut, signUp, refreshProfile } from './authFunctions';

interface MockAuthContextValue {
  user: MockUser | null;
  profile: MockProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: MockUser | null; error: string | null; }>;
  signUp: (email: string, password: string, name: string, role?: string) => Promise<{ user: MockUser | null; error: string | null; }>;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
}

const MockAuthContext = createContext<MockAuthContextValue | null>(null);

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

interface MockAuthProviderProps {
  children: ReactNode;
}

export const MockAuthProvider = ({ children }: MockAuthProviderProps) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user on component mount
    const storedUser = localStorage.getItem('mock_auth_user');
    const storedProfile = localStorage.getItem('mock_auth_profile');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        // If we have a user but no profile, try to fetch it
        (async () => {
          await refreshProfile(JSON.parse(storedUser), setProfile);
        })();
      }
    }
    
    setIsLoading(false);
  }, []);

  const authContext = {
    user,
    profile,
    isLoading,
    signIn: async (email: string, password: string) => {
      const result = await signIn(email, password);
      if (result.user) {
        setUser(result.user);
        if (result.profile) {
          setProfile(result.profile);
        }
      }
      return result;
    },
    signUp: async (email: string, password: string, name: string, role?: string) => {
      const result = await signUp(email, password, name, role);
      if (result.user) {
        setUser(result.user);
        if (result.profile) {
          setProfile(result.profile);
        }
      }
      return result;
    },
    signOut: () => {
      signOut();
      setUser(null);
      setProfile(null);
    },
    refreshProfile: async () => {
      await refreshProfile(user, setProfile);
    },
  };

  return (
    <MockAuthContext.Provider value={authContext}>
      {children}
    </MockAuthContext.Provider>
  );
};
