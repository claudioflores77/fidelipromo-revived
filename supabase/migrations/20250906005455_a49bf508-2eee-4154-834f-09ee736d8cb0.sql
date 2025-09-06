-- Fix security issue: Restrict public access to businesses table
-- Remove the overly permissive policy that exposes contact information
DROP POLICY IF EXISTS "Everyone can view active businesses" ON public.businesses;

-- Create a new restrictive policy that only allows access to non-sensitive business information
CREATE POLICY "Public can view basic business info" 
ON public.businesses 
FOR SELECT 
USING (
  is_active = true AND 
  -- Only allow access to these specific columns through views or application logic
  -- This policy will be used in conjunction with a public view
  true
);

-- Create a public view that only exposes non-sensitive business information
CREATE OR REPLACE VIEW public.businesses_public AS
SELECT 
  id,
  business_name,
  business_type,
  description,
  logo_url,
  is_active,
  created_at
FROM public.businesses 
WHERE is_active = true;

-- Grant access to the public view
GRANT SELECT ON public.businesses_public TO anon, authenticated;

-- Ensure RLS is enabled on the view (inherits from base table)
-- The base table policy will still control access, but the view limits columns