-- Adjust RLS to keep registration working without exposing data
-- 1) Keep SELECT restricted to authenticated users for their own row (already set)
-- 2) Allow public (anon) inserts for registration while still allowing authenticated self-inserts

-- Drop previous insert policy to replace with dual policies
DROP POLICY IF EXISTS "Companies can insert own data" ON public.companies;

-- Allow anonymous registration (public can insert new companies)
CREATE POLICY "Public can register companies" 
ON public.companies 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users to insert only for their own email
CREATE POLICY "Companies can insert own data (auth)" 
ON public.companies 
FOR INSERT 
TO authenticated
WITH CHECK (email = auth.jwt() ->> 'email');