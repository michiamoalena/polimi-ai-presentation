-- Create table for poll responses
CREATE TABLE public.poll_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  uses_ai BOOLEAN NOT NULL,
  ai_tools TEXT[] DEFAULT '{}',
  ai_no_reason TEXT
);

-- Enable RLS
ALTER TABLE public.poll_responses ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anonymous poll)
CREATE POLICY "Anyone can submit poll response"
  ON public.poll_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anyone can view poll results
CREATE POLICY "Anyone can view poll results"
  ON public.poll_responses FOR SELECT
  TO anon, authenticated
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.poll_responses;