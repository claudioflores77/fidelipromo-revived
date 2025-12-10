-- 1. Create/replace the function to add an existing user to a business
CREATE OR REPLACE FUNCTION public.add_user_to_business(
  p_business_id UUID,
  p_email TEXT,
  p_role TEXT
)
RETURNS void AS $$
DECLARE
  inviting_user_role TEXT;
  invited_user_id UUID;
BEGIN
  -- Check if the inviting user is an admin of the business
  SELECT role INTO inviting_user_role
  FROM public.business_users
  WHERE user_id = auth.uid() AND business_id = p_business_id;

  IF inviting_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can add new users.';
  END IF;

  -- Get the user ID from their email
  SELECT id INTO invited_user_id FROM auth.users WHERE email = p_email;

  IF invited_user_id IS NULL THEN
    RAISE EXCEPTION 'User does not exist in the system.';
  END IF;

  -- Add the existing user to the business
  INSERT INTO public.business_users (user_id, business_id, role)
  VALUES (invited_user_id, p_business_id, p_role)
  ON CONFLICT (user_id, business_id) DO UPDATE SET role = p_role, updated_at = now();

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
