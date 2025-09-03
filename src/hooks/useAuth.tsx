import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserType = 'customer' | 'business';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userType: UserType | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userType: UserType, additionalData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user type from profile
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('user_type')
              .eq('user_id', session.user.id)
              .single();
            
            setUserType(profile?.user_type || null);
          }, 0);
        } else {
          setUserType(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('user_type')
            .eq('user_id', session.user.id)
            .single();
          
          setUserType(profile?.user_type || null);
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, userType: UserType, additionalData: any = {}) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          user_type: userType,
          ...additionalData
        }
      }
    });

    if (!error && data.user) {
      // Create user profile
      await supabase
        .from('user_profiles')
        .insert({
          user_id: data.user.id,
          user_type: userType
        });

      // Create specific profile based on user type
      if (userType === 'business') {
        await supabase
          .from('businesses')
          .insert({
            user_id: data.user.id,
            business_name: additionalData.business_name || '',
            business_type: additionalData.business_type || '',
            email: email,
            subscription_plan: additionalData.plan || 'starter'
          });
      } else if (userType === 'customer') {
        const referralCode = await generateReferralCode();
        await supabase
          .from('customers')
          .insert({
            user_id: data.user.id,
            first_name: additionalData.first_name || '',
            last_name: additionalData.last_name || '',
            referral_code: referralCode,
            referred_by_code: additionalData.referral_code || null
          });
      }
    }

    return { error };
  };

  const generateReferralCode = async (): Promise<string> => {
    const { data } = await supabase.rpc('generate_referral_code');
    return data || Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    userType,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};