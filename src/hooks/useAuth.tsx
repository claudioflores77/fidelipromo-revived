import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStore, AppContext } from '@/store';
import { User } from '@supabase/supabase-js';

type UserType = 'customer' | 'business';

interface BusinessData {
  business_name: string;
  business_type: string;
  plan: string;
  phone: string;
  address: string;
}

interface CustomerData {
  first_name: string;
  last_name: string;
  referral_code?: string;
}

type AdditionalSignupData = BusinessData | CustomerData;


export const useAuth = () => {
  const {
    session, setSession,
    userType, setUserType,
    businessId, setBusinessId,
    role, setRole,
    loading, setLoading,
    setContexts, setSelectedContext
  } = useStore();
  const user = session;

  const fetchUserContexts = useCallback(async (userId: string) => {
    const contexts: AppContext[] = [];

    // Check for business contexts
    const { data: businessUsers, error: businessUsersError } = await supabase
      .from('business_users')
      .select(`
        business_id,
        role,
        businesses (
          business_name
        )
      `)
      .eq('user_id', userId);

    if (businessUsersError) {
      console.error("Error fetching business contexts:", businessUsersError);
    } else if (businessUsers) {
      businessUsers.forEach((bu: any) => {
        contexts.push({
          type: 'business',
          id: bu.business_id,
          name: bu.businesses.business_name,
          role: bu.role,
        });
      });
    }

// Check for customer context
const { data: customers, error: customerError } = await supabase
  .from('customers')
  .select('id')
  .eq('user_id', userId);

if (customerError && customerError.code !== 'PGRST116') {
  console.error("Error fetching customer context:", customerError);
} else if (customers && customers.length > 0) {
  contexts.push({
    type: 'customer',
    id: customers[0].id,
  });
}

    setContexts(contexts);
    // Clear old single-role state
    setUserType(null);
    setBusinessId(null);
    setRole(null);
  }, [setContexts, setUserType, setBusinessId, setRole]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user) {
      await fetchUserContexts(data.user.id);
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
        const { data: newBusiness } = await supabase
          .from('businesses')
          .insert({
            user_id: data.user.id,
            business_name: businessData.business_name,
            business_type: businessData.business_type,
            phone: businessData.phone,
            address: businessData.address,
            email: email,
            subscription_plan: businessData.plan,
          })
          .select()
          .single();

        if (newBusiness) {
          await supabase.from('business_users').insert({
            business_id: newBusiness.id,
            user_id: data.user.id,
            role: 'admin'
          });
        }
      } else if (userType === 'customer') {
        const customerData = additionalData as CustomerData;
        const referralCode = await generateReferralCode();

        let referrerId = null;
        if (customerData.referral_code) {
          const { data: referrer } = await supabase
            .from('customers')
            .select('id')
            .eq('referral_code', customerData.referral_code)
            .single();

          referrerId = referrer?.id;
        }

        await supabase.from('customers').insert({
          user_id: data.user.id,
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          referral_code: referralCode,
          referred_by_code: customerData.referral_code || null,
          referred_by_customer_id: referrerId,
        });
      }
      setUserType(userType);
    }
    setLoading(false);
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
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
    setBusinessId(null);
    setRole(null);
    setContexts([]);
    setSelectedContext(null);
  };

  const checkSession = useCallback(async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session?.user ?? null);
    if (session?.user) {
      await fetchUserContexts(session.user.id);
    }
    setLoading(false);
  }, [setSession, setLoading, fetchUserContexts]);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session?.user ?? null);
      if (session?.user) {
        await fetchUserContexts(session.user.id);
      } else {
        setUserType(null);
        setContexts([]);
        setSelectedContext(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkSession, fetchUserContexts, setSession, setLoading, setUserType, setContexts, setSelectedContext]);

  return { user, userType, businessId, role, loading, signIn, signUp, signOut, resetPassword };
};
