import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Customer = Database['public']['Tables']['customers']['Row'];
type CustomerBalance = Database['public']['Tables']['customer_balances']['Row'];
type Transaction = Database['public']['Tables']['transactions']['Row'];
type Business = Database['public']['Tables']['businesses']['Row'];

export const useCustomerData = () => {
  const { user } = useAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        setCustomer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [user]);

  return { customer, loading, error };
};

export const useCustomerBalances = () => {
  const { customer } = useCustomerData();
  const [balances, setBalances] = useState<(CustomerBalance & { business: Business })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!customer) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customer_balances')
          .select(`
            *,
            business:businesses(*)
          `)
          .eq('customer_id', customer.id);

        if (error) throw error;
        setBalances(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching balances');
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [customer]);

  const totalAvailableBalance = balances.reduce((sum, balance) => 
    sum + Number(balance.available_balance || 0), 0
  );

  const totalEarned = balances.reduce((sum, balance) => 
    sum + Number(balance.total_earned || 0), 0
  );

  return { balances, totalAvailableBalance, totalEarned, loading, error };
};

export const useCustomerTransactions = () => {
  const { customer } = useCustomerData();
  const [transactions, setTransactions] = useState<(Transaction & { business: Business })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!customer) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('transactions')
          .select(`
            *,
            business:businesses(*)
          `)
          .eq('customer_id', customer.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTransactions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [customer]);

  return { transactions, loading, error };
};

export const useReferralStats = () => {
  const { customer } = useCustomerData();
  const [referralCount, setReferralCount] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralStats = async () => {
      if (!customer) {
        setLoading(false);
        return;
      }

      try {
        // Count direct referrals
        const { count, error: countError } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true })
          .eq('referred_by_customer_id', customer.id);

        if (countError) throw countError;

        // Get referral earnings
        const { data: earnings, error: earningsError } = await supabase
          .from('referral_earnings')
          .select('amount')
          .eq('referrer_customer_id', customer.id);

        if (earningsError) throw earningsError;

        const totalEarnings = earnings?.reduce((sum, earning) => 
          sum + Number(earning.amount || 0), 0
        ) || 0;

        setReferralCount(count || 0);
        setReferralEarnings(totalEarnings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching referral stats');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralStats();
  }, [customer]);

  return { referralCount, referralEarnings, loading, error };
};