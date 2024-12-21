import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  credits: number;
}

interface AuthState {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  fetchProfile: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ profile: null });
        return;
      }

      // Get existing profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        set({ profile });
      } else {
        // Create new profile if it doesn't exist
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            role: 'user',
            credits: 0
          }, { onConflict: 'id' })
          .select()
          .single();

        if (!error && newProfile) {
          set({ profile: newProfile });
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ profile: null });
    }
  },
}));