
// Types for our mock authentication system

export type UserRole = "user" | "tradesperson" | "admin";

export interface MockUser {
  id: string;
  email: string;
  created_at: string;
}

export interface MockProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface MockAuthContextType {
  user: MockUser | null;
  profile: MockProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Storage keys for mock auth
export const STORAGE_KEYS = {
  USER: "mock_user",
  PROFILE: "mock_profile",
};
