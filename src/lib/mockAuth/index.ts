
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";

// Define types for user and profile
export type Role = "user" | "tradesperson" | "admin";

export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  role: Role;
  avatarUrl: string | null;
}

// Mock data for initial users and profiles
const mockUsers: User[] = [
  { id: "user-1", email: "user@example.com" },
  { id: "user-2", email: "tradesperson@example.com" },
  { id: "user-3", email: "admin@example.com" },
];

const mockProfiles: Profile[] = [
  {
    id: "profile-1",
    userId: "user-1",
    name: "John Doe",
    role: "user",
    avatarUrl: null,
  },
  {
    id: "profile-2",
    userId: "user-2",
    name: "Jane Smith",
    role: "tradesperson",
    avatarUrl: null,
  },
  {
    id: "profile-3",
    userId: "user-3",
    name: "Admin User",
    role: "admin",
    avatarUrl: null,
  },
];

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password?: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  error: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const MockAuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem("mock_session");
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        setUser(session.user);
        setProfile(session.profile);
      } catch (e) {
        console.error("Error parsing session from localStorage", e);
        localStorage.removeItem("mock_session");
      }
    }
  }, []);

  // Sign in function
  const signIn = useCallback(async (email: string, password?: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find((u) => u.email === email);

    if (!foundUser) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    // For demo purposes, any password will work
    // In a real app, you'd hash and compare passwords
    const foundProfile = mockProfiles.find((p) => p.userId === foundUser.id);

    if (!foundProfile) {
      setError("No profile found for this user");
      setIsLoading(false);
      return;
    }

    // Update state and localStorage
    setUser(foundUser);
    setProfile(foundProfile);
    localStorage.setItem(
      "mock_session",
      JSON.stringify({ user: foundUser, profile: foundProfile })
    );
    setIsLoading(false);
  }, []);

  // Sign out function
  const signOut = useCallback(() => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("mock_session");
  }, []);

  const value = {
    user,
    profile,
    signIn,
    signOut,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create the useAuth hook
export const useMockAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
