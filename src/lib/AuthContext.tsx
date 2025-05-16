import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "./supabase";
import { User, Session } from '@supabase/supabase-js';
import { Database } from "../types/database.types";
import { LoginInput, RegisterInput } from "./auth";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change:", event, "User ID:", currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check email verification status
        if (currentSession?.user) {
          setIsEmailVerified(!!currentSession.user.email_confirmed_at);
          
          // Fetch user profile if user is authenticated - using setTimeout to avoid auth deadlock
          setTimeout(() => {
            if (currentSession.user) {
              fetchUserProfile(currentSession.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
          setIsEmailVerified(false);
        }
      }
    );

    // THEN check for existing session
    console.log("Checking for existing session");
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.id);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        setIsEmailVerified(!!currentSession.user.email_confirmed_at);
        fetchUserProfile(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      console.log("Profile fetched:", data);
      setProfile(data);
    } catch (error) {
      console.error("Error in profile fetch:", error);
    }
  };

  const navigateBasedOnRole = (role: "user" | "tradesperson" | "admin", isVerified: boolean) => {
    if (!isVerified) {
      // Don't navigate if email is not verified
      return;
    }
    
    switch (role) {
      case "tradesperson":
        navigate("/provider/projects");
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
      console.log("Login attempt with:", data.email);
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Login successful:", authData.user?.id);
      
      // Check if email is verified
      const isVerified = !!authData.user?.email_confirmed_at;
      setIsEmailVerified(isVerified);
      
      if (!isVerified) {
        // Store the email temporarily to use for resending verification
        sessionStorage.setItem('pendingEmail', data.email);
        toast.warning("Please verify your email before logging in");
        throw new Error("Email not confirmed");
      }

      toast.success("Logged in successfully");
      
      if (authData.user) {
        // Fetch profile using the user ID
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .maybeSingle();
          
        if (profileData) {
          navigateBasedOnRole(profileData.role, isVerified);
        } else {
          // Fallback if profile not found
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const register = async (data: RegisterInput) => {
    try {
      console.log("Starting registration process with Supabase...");
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role,
          },
        },
      });

      if (error) {
        console.error("Supabase registration error:", error);
        toast.error(error.message || "Registration failed");
        throw error;
      }

      console.log("Registration successful:", authData);
      
      // Check if email verification is required
      const isVerified = !!authData.user?.email_confirmed_at;
      setIsEmailVerified(isVerified);
      
      if (isVerified) {
        toast.success("Registration successful! You are now logged in.");
        if (authData.user) {
          navigateBasedOnRole(data.role, true);
        }
      } else {
        // Store the email temporarily for resending verification
        sessionStorage.setItem('pendingEmail', data.email);
        toast.success("Registration successful! Please check your email to verify your account.");
      }
    } catch (error: any) {
      console.error("Registration exception:", error);
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsEmailVerified(false);
      sessionStorage.removeItem('pendingEmail'); // Clean up stored email
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
