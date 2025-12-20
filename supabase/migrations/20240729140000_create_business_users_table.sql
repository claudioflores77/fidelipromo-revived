CREATE TABLE public.business_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'operator')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(business_id, user_id)
);

-- RLS policies
ALTER TABLE public.business_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business admins can manage team" ON public.business_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.business_users bu
            JOIN public.businesses b ON bu.business_id = b.id
            WHERE bu.user_id = auth.uid()
            AND bu.role = 'admin'
            AND bu.business_id = business_users.business_id
        )
    );