
// Mock authentication system for demonstration purposes
// In a real application, you would use a proper authentication provider like Supabase Auth

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MockUser, MockProfile, MockAuthContextType, STORAGE_KEYS } from "./types";
import { signIn, signUp, signOut, resetPassword, updatePassword, refreshProfile } from "./authFunctions";

// Create the auth context
const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

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

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password, setUser, setProfile, setIsLoading);
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
    role: import("./types").UserRole
  ) => {
    await signUp(email, password, name, role, setUser, setProfile, setIsLoading);
  };

  const handleSignOut = async () => {
    await signOut(setUser, setProfile, setIsLoading);
  };

  const handleResetPassword = async (email: string) => {
    await resetPassword(email, setIsLoading);
  };

  const handleUpdatePassword = async (password: string) => {
    await updatePassword(password, user, setIsLoading);
  };

  const handleRefreshProfile = async () => {
    await refreshProfile(user, setProfile);
  };

  return (
    <MockAuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        resetPassword: handleResetPassword,
        updatePassword: handleUpdatePassword,
        refreshProfile: handleRefreshProfile
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

// Re-export types for convenience
export * from "./types";
