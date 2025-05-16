
import supabase from "./supabase";
import { LoginInput, RegisterInput } from "./auth";

export const supabaseService = {
  // Authentication methods
  async signUp({ email, password, name, role }: RegisterInput) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });
  },

  async signIn({ email, password }: LoginInput) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  async resetPasswordForEmail(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },

  // User profile methods
  async getUserProfile(userId: string) {
    return supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
  },

  async updateUserProfile(userId: string, updates: any) {
    return supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);
  },

  // Email verification methods
  async resendVerificationEmail(email: string) {
    return supabase.auth.resend({
      type: 'signup',
      email,
    });
  },
};
