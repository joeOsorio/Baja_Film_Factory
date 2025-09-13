-- CRITICAL SECURITY FIX: Restrict companies table access to authenticated users only
-- This fixes the vulnerability where password hashes and emails were publicly accessible

-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Companies can view their own data" ON public.companies;
DROP POLICY IF EXISTS "Companies can insert their own data" ON public.companies;

-- Create secure policies that require authentication and proper access control
-- Companies can only view their own data by matching email
CREATE POLICY "Companies can view own data by email" 
ON public.companies 
FOR SELECT 
TO authenticated
USING (email = auth.jwt() ->> 'email');

-- Companies can only insert data for their own email
CREATE POLICY "Companies can insert own data" 
ON public.companies 
FOR INSERT 
TO authenticated
WITH CHECK (email = auth.jwt() ->> 'email');

-- Companies can update their own data
CREATE POLICY "Companies can update own data" 
ON public.companies 
FOR UPDATE 
TO authenticated
USING (email = auth.jwt() ->> 'email')
WITH CHECK (email = auth.jwt() ->> 'email');

-- Ensure RLS is enabled (should already be enabled)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;