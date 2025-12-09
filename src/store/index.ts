import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

type UserType = 'customer' | 'business';

type State = {
  session: User | null;
  userType: UserType | null;
  loading: boolean;
  setSession: (session: User | null) => void;
  setUserType: (userType: UserType | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useStore = create<State>((set) => ({
  session: null,
  userType: null,
  loading: true,
  setSession: (session) => set({ session }),
  setUserType: (userType) => set({ userType }),
  setLoading: (loading) => set({ loading }),
}));
