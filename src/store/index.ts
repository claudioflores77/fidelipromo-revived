import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

type UserType = 'customer' | 'business';

type Role = 'admin' | 'operator';

type State = {
  session: User | null;
  userType: UserType | null;
  businessId: string | null;
  role: Role | null;
  loading: boolean;
  setSession: (session: User | null) => void;
  setUserType: (userType: UserType | null) => void;
  setBusinessId: (businessId: string | null) => void;
  setRole: (role: Role | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useStore = create<State>((set) => ({
  session: null,
  userType: null,
  businessId: null,
  role: null,
  loading: true,
  setSession: (session) => set({ session }),
  setUserType: (userType) => set({ userType }),
  setBusinessId: (businessId) => set({ businessId }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
}));
