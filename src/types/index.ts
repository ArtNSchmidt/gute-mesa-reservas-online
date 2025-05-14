
import { Session } from '@supabase/supabase-js';

export interface Reservation {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Admin {
  email: string;
  name: string;
}

export interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
}

// Supabase database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          role: 'customer' | 'admin';
        };
      };
      reservations: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          date: string;
          time: string;
          guests: number;
          special_requests: string | null;
          status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
