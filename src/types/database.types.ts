
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          role: "user" | "tradesperson" | "admin"
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          role: "user" | "tradesperson" | "admin"
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          role?: "user" | "tradesperson" | "admin"
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "user" | "tradesperson" | "admin"
    }
  }
}
