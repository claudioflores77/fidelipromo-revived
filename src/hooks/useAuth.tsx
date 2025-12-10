import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStore } from '@/store';
import { User } from '@supabase/supabase-js';

type UserType = 'customer' | 'business';

interface BusinessData {
  business_name: string;
  business_type: string;
  plan: string;
}

interface CustomerData {
  first_name: string;
  last_name: string;
  referral_code?: string;
}

type AdditionalSignupData = BusinessData | CustomerData;


export const useAuth = () => {
  const { session, setSession, userType, setUserType, loading, setLoading } = useStore();
  const user = session;

  const fetchUserType = useCallback(async (userId: string) => {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('user_id', userId)
      .single();
    setUserType(profile?.user_type || null);
  }, [setUserType]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user) {
      await fetchUserType(data.user.id);
    }
    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string, userType: UserType, additionalData: AdditionalSignupData) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          user_type: userType,
          ...additionalData
        },
      },
    });

    if (!error && data.user) {
      // Create a profile entry
      await supabase.from('user_profiles').insert({ user_id: data.user.id, user_type: userType });

      // Create business or customer entry
      if (userType === 'business') {
        const businessData = additionalData as BusinessData;
        await supabase.from('businesses').insert({
          user_id: data.user.id,
          business_name: businessData.business_name,
          business_type: businessData.business_type,
          email: email,
          subscription_plan: businessData.plan,
        });
      } else if (userType === 'customer') {
        const customerData = additionalData as CustomerData;
        const referralCode = await generateReferralCode();
        await supabase.from('customers').insert({
          user_id: data.user.id,
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          referral_code: referralCode,
          referred_by_code: customerData.referral_code || null,
        });
      }
      setUserType(userType);
    }
    setLoading(false);
    return { error };
  };

  const generateReferralCode = async (): Promise<string> => {
    const { data } = await supabase.rpc('generate_referral_code');
    return data || Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserType(null);
  };

  const checkSession = useCallback(async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session?.user ?? null);
    if (session?.user) {
      await fetchUserType(session.user.id);
    }
    setLoading(false);
  }, [setSession, setLoading, fetchUserType]);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session?.user ?? null);
      if (session?.user) {
        await fetchUserType(session.user.id);
      } else {
        setUserType(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkSession, fetchUserType, setSession, setLoading, setUserType]);

  return { user, userType, loading, signIn, signUp, signOut };
};
