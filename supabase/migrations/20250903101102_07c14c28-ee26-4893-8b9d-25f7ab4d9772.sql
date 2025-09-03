-- Create enum types for user roles and transaction types
CREATE TYPE user_type AS ENUM ('customer', 'business');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE referral_level AS ENUM ('level_1', 'level_2', 'level_3');

-- Create businesses table
CREATE TABLE public.businesses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    cashback_percentage DECIMAL(5,2) DEFAULT 5.00 CHECK (cashback_percentage >= 0 AND cashback_percentage <= 100),
    referral_level_1_percentage DECIMAL(5,2) DEFAULT 2.00 CHECK (referral_level_1_percentage >= 0 AND referral_level_1_percentage <= 100),
    referral_level_2_percentage DECIMAL(5,2) DEFAULT 1.00 CHECK (referral_level_2_percentage >= 0 AND referral_level_2_percentage <= 100),
    referral_level_3_percentage DECIMAL(5,2) DEFAULT 0.50 CHECK (referral_level_3_percentage >= 0 AND referral_level_3_percentage <= 100),
    subscription_plan TEXT DEFAULT 'starter',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    referral_code TEXT UNIQUE NOT NULL,
    referred_by_code TEXT,
    referred_by_customer_id UUID REFERENCES public.customers(id),
    total_cashback_earned DECIMAL(10,2) DEFAULT 0.00,
    total_referral_earnings DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer_balances table for cashback per business
CREATE TABLE public.customer_balances (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    available_balance DECIMAL(10,2) DEFAULT 0.00,
    total_earned DECIMAL(10,2) DEFAULT 0.00,
    total_redeemed DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(customer_id, business_id)
);

-- Create transactions table
CREATE TABLE public.transactions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    cashback_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    cashback_percentage DECIMAL(5,2) NOT NULL,
    transaction_type TEXT NOT NULL DEFAULT 'purchase',
    status transaction_status DEFAULT 'completed',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create referral_earnings table for tracking multilevel referrals
CREATE TABLE public.referral_earnings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
    referrer_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    referred_customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    level referral_level NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    percentage DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table for additional user info
CREATE TABLE public.user_profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    user_type user_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for businesses
CREATE POLICY "Businesses can manage their own data" ON public.businesses
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view active businesses" ON public.businesses
    FOR SELECT USING (is_active = true);

-- Create RLS policies for customers  
CREATE POLICY "Customers can manage their own data" ON public.customers
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Businesses can view their customers" ON public.customers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.transactions t
            JOIN public.businesses b ON t.business_id = b.id
            WHERE t.customer_id = customers.id AND b.user_id = auth.uid()
        )
    );

-- Create RLS policies for customer_balances
CREATE POLICY "Customers can view their own balances" ON public.customer_balances
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.customers c
            WHERE c.id = customer_balances.customer_id AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Businesses can view balances for their customers" ON public.customer_balances
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = customer_balances.business_id AND b.user_id = auth.uid()
        )
    );

-- Create RLS policies for transactions
CREATE POLICY "Customers can view their own transactions" ON public.transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.customers c
            WHERE c.id = transactions.customer_id AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Businesses can manage transactions for their customers" ON public.transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = transactions.business_id AND b.user_id = auth.uid()
        )
    );

-- Create RLS policies for referral_earnings
CREATE POLICY "Customers can view their referral earnings" ON public.referral_earnings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.customers c
            WHERE c.id = referral_earnings.referrer_customer_id AND c.user_id = auth.uid()
        )
    );

-- Create RLS policies for user_profiles
CREATE POLICY "Users can manage their own profiles" ON public.user_profiles
    FOR ALL USING (auth.uid() = user_id);

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result TEXT := '';
    i INTEGER;
    code_exists BOOLEAN;
BEGIN
    LOOP
        result := '';
        FOR i IN 1..8 LOOP
            result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
        END LOOP;
        
        SELECT EXISTS(SELECT 1 FROM public.customers WHERE referral_code = result) INTO code_exists;
        
        IF NOT code_exists THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_balances_updated_at
    BEFORE UPDATE ON public.customer_balances
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to process cashback and referral earnings
CREATE OR REPLACE FUNCTION process_transaction_rewards()
RETURNS TRIGGER AS $$
DECLARE
    customer_record RECORD;
    referrer_1 RECORD;
    referrer_2 RECORD;
    referrer_3 RECORD;
    business_record RECORD;
    level_1_amount DECIMAL(10,2);
    level_2_amount DECIMAL(10,2);
    level_3_amount DECIMAL(10,2);
BEGIN
    -- Get business configuration
    SELECT * INTO business_record FROM public.businesses WHERE id = NEW.business_id;
    
    -- Get customer info
    SELECT * INTO customer_record FROM public.customers WHERE id = NEW.customer_id;
    
    -- Update or create customer balance
    INSERT INTO public.customer_balances (customer_id, business_id, available_balance, total_earned)
    VALUES (NEW.customer_id, NEW.business_id, NEW.cashback_amount, NEW.cashback_amount)
    ON CONFLICT (customer_id, business_id)
    DO UPDATE SET 
        available_balance = customer_balances.available_balance + NEW.cashback_amount,
        total_earned = customer_balances.total_earned + NEW.cashback_amount;
    
    -- Process referral earnings if customer was referred
    IF customer_record.referred_by_customer_id IS NOT NULL THEN
        -- Level 1 referral
        SELECT * INTO referrer_1 FROM public.customers WHERE id = customer_record.referred_by_customer_id;
        
        level_1_amount := (NEW.amount * business_record.referral_level_1_percentage / 100);
        
        INSERT INTO public.referral_earnings (
            transaction_id, referrer_customer_id, referred_customer_id, 
            business_id, level, amount, percentage
        ) VALUES (
            NEW.id, referrer_1.id, NEW.customer_id, 
            NEW.business_id, 'level_1', level_1_amount, business_record.referral_level_1_percentage
        );
        
        -- Level 2 referral
        IF referrer_1.referred_by_customer_id IS NOT NULL THEN
            SELECT * INTO referrer_2 FROM public.customers WHERE id = referrer_1.referred_by_customer_id;
            
            level_2_amount := (NEW.amount * business_record.referral_level_2_percentage / 100);
            
            INSERT INTO public.referral_earnings (
                transaction_id, referrer_customer_id, referred_customer_id,
                business_id, level, amount, percentage
            ) VALUES (
                NEW.id, referrer_2.id, NEW.customer_id,
                NEW.business_id, 'level_2', level_2_amount, business_record.referral_level_2_percentage
            );
            
            -- Level 3 referral
            IF referrer_2.referred_by_customer_id IS NOT NULL THEN
                SELECT * INTO referrer_3 FROM public.customers WHERE id = referrer_2.referred_by_customer_id;
                
                level_3_amount := (NEW.amount * business_record.referral_level_3_percentage / 100);
                
                INSERT INTO public.referral_earnings (
                    transaction_id, referrer_customer_id, referred_customer_id,
                    business_id, level, amount, percentage
                ) VALUES (
                    NEW.id, referrer_3.id, NEW.customer_id,
                    NEW.business_id, 'level_3', level_3_amount, business_record.referral_level_3_percentage
                );
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic reward processing
CREATE TRIGGER process_rewards_on_transaction
    AFTER INSERT ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION process_transaction_rewards();

-- Create indexes for better performance
CREATE INDEX idx_customers_referral_code ON public.customers(referral_code);
CREATE INDEX idx_customers_referred_by ON public.customers(referred_by_customer_id);
CREATE INDEX idx_customer_balances_customer_business ON public.customer_balances(customer_id, business_id);
CREATE INDEX idx_transactions_business_id ON public.transactions(business_id);
CREATE INDEX idx_transactions_customer_id ON public.transactions(customer_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);
CREATE INDEX idx_referral_earnings_referrer ON public.referral_earnings(referrer_customer_id);
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_user_profiles_user_type ON public.user_profiles(user_type);