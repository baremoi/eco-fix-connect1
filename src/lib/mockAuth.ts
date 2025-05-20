
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginInput, RegisterInput } from "./auth";

// Mock User type
export interface MockUser {
  id: string;
  email: string;
  email_confirmed_at: string;
}

// Mock Profile type
export interface MockProfile {
  id: string;
  full_name: string;
  email: string;
  role: "user" | "tradesperson" | "admin";
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  address?: string;
}

// Mock Session type
export interface MockSession {
  user: MockUser;
}

interface MockAuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  profile: MockProfile | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  isEmailVerified: boolean;
}

// Default mock user data
const MOCK_USERS: Record<string, { user: MockUser; profile: MockProfile }> = {
  "user@example.com": {
    user: {
      id: "user-1",
      email: "user@example.com",
      email_confirmed_at: new Date().toISOString()
    },
    profile: {
      id: "user-1",
      full_name: "John Doe",
      email: "user@example.com",
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: "https://i.pravatar.cc/150?u=user-1"
    }
  },
  "tradesperson@example.com": {
    user: {
      id: "tradesperson-1",
      email: "tradesperson@example.com",
      email_confirmed_at: new Date().toISOString()
    },
    profile: {
      id: "tradesperson-1",
      full_name: "Jane Smith",
      email: "tradesperson@example.com",
      role: "tradesperson",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: "https://i.pravatar.cc/150?u=tradesperson-1"
    }
  },
  "admin@example.com": {
    user: {
      id: "admin-1",
      email: "admin@example.com",
      email_confirmed_at: new Date().toISOString()
    },
    profile: {
      id: "admin-1",
      full_name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: "https://i.pravatar.cc/150?u=admin-1"
    }
  }
};

// Local storage keys
const STORAGE_KEYS = {
  SESSION: 'mock_session',
  USER: 'mock_user',
  PROFILE: 'mock_profile',
};

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [profile, setProfile] = useState<MockProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = () => {
      const storedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);

      if (storedSession && storedUser && storedProfile) {
        try {
          const parsedSession = JSON.parse(storedSession);
          const parsedUser = JSON.parse(storedUser);
          const parsedProfile = JSON.parse(storedProfile);
          
          setSession(parsedSession);
          setUser(parsedUser);
          setProfile(parsedProfile);
          setIsEmailVerified(!!parsedUser.email_confirmed_at);
        } catch (error) {
          console.error("Error parsing stored auth data", error);
          // Clear invalid data
          localStorage.removeItem(STORAGE_KEYS.SESSION);
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.PROFILE);
        }
      }
      
      setIsLoading(false);
    };

    loadSession();
  }, []);

  const navigateBasedOnRole = (role: "user" | "tradesperson" | "admin") => {
    switch (role) {
      case "tradesperson":
        navigate("/provider/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const login = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      
      const mockUser = MOCK_USERS[data.email];
      
      if (!mockUser || data.password !== "password") {
        throw new Error("Invalid email or password");
      }

      const { user, profile } = mockUser;
      const newSession = { user };

      // Store session in localStorage
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(newSession));
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));

      setUser(user);
      setSession(newSession);
      setProfile(profile);
      setIsEmailVerified(!!user.email_confirmed_at);
      
      toast.success("Logged in successfully");
      navigateBasedOnRole(profile.role);

    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    try {
      setIsLoading(true);

      // Check if email is already taken
      if (MOCK_USERS[data.email]) {
        throw new Error("Email already in use");
      }

      // Create new mock user
      const newUserId = `user-${Date.now()}`;
      const now = new Date().toISOString();
      
      const newUser: MockUser = {
        id: newUserId,
        email: data.email,
        email_confirmed_at: now // Auto-confirm email for mock system
      };

      const newProfile: MockProfile = {
        id: newUserId,
        full_name: data.name,
        email: data.email,
        role: data.role,
        created_at: now,
        updated_at: now,
        avatar_url: `https://i.pravatar.cc/150?u=${newUserId}`
      };

      // Add to mock users
      MOCK_USERS[data.email] = { user: newUser, profile: newProfile };
      
      // Create session
      const newSession = { user: newUser };

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(newSession));
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));

      setUser(newUser);
      setSession(newSession);
      setProfile(newProfile);
      setIsEmailVerified(true);

      toast.success("Registration successful!");
      navigateBasedOnRole(data.role);

    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      
      // Reset state
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsEmailVerified(false);
      
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
      throw error;
    }
  };

  return (
    <MockAuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isEmailVerified,
        login,
        register,
        logout,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
}
