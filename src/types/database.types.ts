
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
          avatar_url?: string
          bio?: string
          phone?: string
          address?: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          role?: "user" | "tradesperson" | "admin"
          created_at?: string
          updated_at?: string | null
          avatar_url?: string
          bio?: string
          phone?: string
          address?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          role?: "user" | "tradesperson" | "admin"
          created_at?: string
          updated_at?: string | null
          avatar_url?: string
          bio?: string
          phone?: string
          address?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          project_id?: string
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
          project_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          read?: boolean
          project_id?: string
          created_at?: string
        }
      }
      service_categories: {
        Row: {
          id: string
          name: string
          description?: string
          icon?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          icon?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          created_at?: string
        }
      }
      tradesperson_services: {
        Row: {
          id: string
          tradesperson_id: string
          category_id: string
          hourly_rate?: number
          availability_status?: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tradesperson_id: string
          category_id: string
          hourly_rate?: number
          availability_status?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tradesperson_id?: string
          category_id?: string
          hourly_rate?: number
          availability_status?: boolean
          created_at?: string
          updated_at?: string
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
      service_category: 
        | "handyman" | "car_wash" | "valet" | "domestic_cleaner" | "commercial_cleaner"
        | "painter" | "gardener" | "furniture_assembler" | "mover" | "organizer"
        | "babysitter" | "pet_sitter" | "plumber" | "electrician" | "hairdresser"
        | "nail_technician" | "photographer" | "driver" | "gas_engineer" | "hvac_technician"
        | "scaffolder" | "roofer" | "stonemason" | "asbestos_specialist" | "bricklayer"
        | "carpenter" | "drainage_specialist" | "security_installer" | "dog_walker"
        | "dog_trainer" | "dog_groomer"
    }
  }
}
