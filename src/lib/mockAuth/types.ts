
export interface MockUser {
  id: string;
  email: string;
  createdAt: string;
}

export type UserRole = "user" | "tradesperson" | "admin";

export interface MockProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
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

export const STORAGE_KEYS = {
  USER: 'mock_auth_user',
  PROFILE: 'mock_auth_profile',
};
