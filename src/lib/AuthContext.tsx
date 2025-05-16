
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
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check email verification status
        if (session?.user) {
          setIsEmailVerified(!!session.user.email_confirmed_at);
          
          // Fetch user profile if user is authenticated
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsEmailVerified(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setIsEmailVerified(!!session.user.email_confirmed_at);
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error in profile fetch:", error);
    }
  };

  const navigateBasedOnRole = (role: "user" | "tradesperson" | "admin", isVerified: boolean) => {
    if (!isVerified) {
      // Don't navigate if email is not verified
      // The Register component will show the verification message
      return;
    }
    
    switch (role) {
      case "tradesperson":
        navigate("/provider/projects");
        break;
      case "admin":
        navigate("/admin/analytics");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const login = async (data: LoginInput) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      
      // Check if email is verified
      const isVerified = !!authData.user?.email_confirmed_at;
      setIsEmailVerified(isVerified);
      
      if (!isVerified) {
        toast.warning("Please verify your email before logging in");
        return;
      }

      toast.success("Logged in successfully");
      
      if (authData.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();
          
        if (profileData) {
          navigateBasedOnRole(profileData.role, isVerified);
        } else {
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
      
      // Log environment variables for debugging
      console.log("Supabase URL exists:", !!import.meta.env.VITE_SUPABASE_URL);
      console.log("Supabase Key exists:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
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
