import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// MOCKED Supabase client for local demo
export const supabase = {
  auth: {
    getUser: async () => ({
      data: { user: {
        id: 'demo',
        email: 'demo@wayfind.com',
        user_metadata: { name: 'Demo User' },
        aud: 'authenticated',
        role: 'authenticated',
        created_at: new Date().toISOString(),
        confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        app_metadata: {},
        identities: [],
        phone: null,
        email_confirmed_at: new Date().toISOString(),
        phone_confirmed_at: null,
        invited_at: null,
        action_link: null,
        recovery_sent_at: null,
        banned_until: null,
        reauthentication_sent_at: null,
        reauthentication_token: null,
        factors: null,
        is_anonymous: false
      } }
    }),
    signUp: async (credentials: any) => ({ error: null }),
    signInWithPassword: async (credentials: any) => ({ error: null }),
  }
};

// (Restore the original code and .env.local when ready for real Supabase)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          university_email?: string
          name: string
          university: string
          program?: string
          year_of_study?: number
          bio?: string
          profile_photo?: string
          language_preferences?: string[]
          interests?: string[]
          skills?: string[]
          privacy_settings?: any
          verification_status?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          university_email?: string
          name: string
          university: string
          program?: string
          year_of_study?: number
          bio?: string
          profile_photo?: string
          language_preferences?: string[]
          interests?: string[]
          skills?: string[]
          privacy_settings?: any
          verification_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          university_email?: string
          name?: string
          university?: string
          program?: string
          year_of_study?: number
          bio?: string
          profile_photo?: string
          language_preferences?: string[]
          interests?: string[]
          skills?: string[]
          privacy_settings?: any
          verification_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description?: string
          category: string
          organizer_id: string
          location?: string
          start_date: string
          end_date: string
          max_attendees?: number
          current_attendees?: number
          registration_required: boolean
          tags?: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          category: string
          organizer_id: string
          location?: string
          start_date: string
          end_date: string
          max_attendees?: number
          current_attendees?: number
          registration_required?: boolean
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          organizer_id?: string
          location?: string
          start_date?: string
          end_date?: string
          max_attendees?: number
          current_attendees?: number
          registration_required?: boolean
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      connections: {
        Row: {
          id: string
          user_a_id: string
          user_b_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_a_id: string
          user_b_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_a_id?: string
          user_b_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id?: string
          group_id?: string
          content: string
          message_type?: string
          file_url?: string
          read_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          recipient_id?: string
          group_id?: string
          content: string
          message_type?: string
          file_url?: string
          read_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          recipient_id?: string
          group_id?: string
          content?: string
          message_type?: string
          file_url?: string
          read_at?: string
          created_at?: string
        }
      }
      counseling_sessions: {
        Row: {
          id: string
          student_id: string
          counselor_id: string
          session_type: string
          scheduled_date: string
          status: string
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          counselor_id: string
          session_type: string
          scheduled_date: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          counselor_id?: string
          session_type?: string
          scheduled_date?: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          badge_type: string
          badge_level: string
          progress?: number
          earned_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_type: string
          badge_level: string
          progress?: number
          earned_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_type?: string
          badge_level?: string
          progress?: number
          earned_at?: string
          created_at?: string
        }
      }
    }
  }
} 