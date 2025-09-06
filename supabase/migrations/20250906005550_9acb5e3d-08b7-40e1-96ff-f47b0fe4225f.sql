-- Fix the security definer view issue by creating a regular view
-- Drop the existing view and recreate without SECURITY DEFINER
DROP VIEW IF EXISTS public.businesses_public;

-- Create a regular view (not SECURITY DEFINER) that only exposes non-sensitive business information
CREATE VIEW public.businesses_public AS
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

-- Grant access to the public view for both anonymous and authenticated users
GRANT SELECT ON public.businesses_public TO anon, authenticated;