import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

type UserType = 'customer' | 'business';

type Role = 'admin' | 'operator';

interface BusinessContext {
  type: 'business';
  id: string;
  name: string;
  role: Role;
}

interface CustomerContext {
  type: 'customer';
  id: string;
}

export type AppContext = BusinessContext | CustomerContext;

type State = {
  user: User | null;
  session: User | null;
  userType: UserType | null;
  businessId: string | null;
  role: Role | null;
  loading: boolean;
  contexts: AppContext[];
  selectedContext: AppContext | null;
  setSession: (session: User | null) => void;
  setUserType: (userType: UserType | null) => void;
  setBusinessId: (businessId: string | null) => void;
  setRole: (role: Role | null) => void;
  setLoading: (loading: boolean) => void;
  setContexts: (contexts: AppContext[]) => void;
  setSelectedContext: (context: AppContext | null) => void;
};

export const useStore = create<State>((set) => ({
  user: null,
  session: null,
  userType: null,
  businessId: null,
  role: null,
  loading: true,
  contexts: [],
  selectedContext: null,
  setSession: (session) => set({ session, user: session }),
  setUserType: (userType) => set({ userType }),
  setBusinessId: (businessId) => set({ businessId }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
  setContexts: (contexts) => set({ contexts }),
  setSelectedContext: (context) => set({ selectedContext: context }),
}));
