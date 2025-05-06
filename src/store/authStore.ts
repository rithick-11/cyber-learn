import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import type { User } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await useAuthStore.getState().loadUser();
  },
  signUp: async (email, password, username) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username,
          xp: 0,
          level: 1,
          achievements: [],
          completedModules: []
        }
      }
    });
    if (error) throw error;
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  loadUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      set({ user: data as User, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  }
}));