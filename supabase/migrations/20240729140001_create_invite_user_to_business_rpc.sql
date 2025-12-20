CREATE OR REPLACE FUNCTION invite_user_to_business(
  p_email TEXT,
  p_business_id UUID,
  p_role TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_result JSON;
BEGIN
  -- Buscar usuario por email
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email;

  IF v_user_id IS NULL THEN
    RETURN json_build_object('error', 'Usuario no encontrado');
  END IF;

  -- Insertar en business_users
  INSERT INTO public.business_users (business_id, user_id, role)
  VALUES (p_business_id, v_user_id, p_role)
  ON CONFLICT (business_id, user_id)
  DO UPDATE SET role = p_role;

  RETURN json_build_object('success', true, 'user_id', v_user_id);
END;
$$;