
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

  // Avatar storage methods
  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    // Get the public URL using the getPublicUrl method
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteAvatar(userId: string, path: string) {
    return supabase.storage
      .from('avatars')
      .remove([`${userId}/${path}`]);
  },

  // Email verification methods
  async resendVerificationEmail(email: string) {
    return supabase.auth.resend({
      type: 'signup',
      email,
    });
  },
};
