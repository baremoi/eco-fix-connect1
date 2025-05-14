
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
          full_name: string
          email: string
          role: 'user' | 'tradesperson' | 'admin'
          phone: string | null
          address: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          role?: 'user' | 'tradesperson' | 'admin'
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          role?: 'user' | 'tradesperson' | 'admin'
          phone?: string | null
          address?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      service_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          user_id: string
          category_id: string | null
          budget_min: number | null
          budget_max: number | null
          location: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          user_id: string
          category_id?: string | null
          budget_min?: number | null
          budget_max?: number | null
          location?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          user_id?: string
          category_id?: string | null
          budget_min?: number | null
          budget_max?: number | null
          location?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          project_id: string | null
          user_id: string
          tradesperson_id: string
          start_time: string
          end_time: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          user_id: string
          tradesperson_id: string
          start_time: string
          end_time: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          user_id?: string
          tradesperson_id?: string
          start_time?: string
          end_time?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          tradesperson_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          tradesperson_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          tradesperson_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      tradesperson_services: {
        Row: {
          id: string
          tradesperson_id: string
          category_id: string
          hourly_rate: number | null
          availability_status: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tradesperson_id: string
          category_id: string
          hourly_rate?: number | null
          availability_status?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tradesperson_id?: string
          category_id?: string
          hourly_rate?: number | null
          availability_status?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
