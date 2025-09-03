-- Fix security warning: Set search_path for the generate_referral_code function
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;