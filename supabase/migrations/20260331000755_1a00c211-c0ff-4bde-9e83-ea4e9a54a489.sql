CREATE TABLE public.button_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.button_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert button completion" ON public.button_completions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view button completions" ON public.button_completions
  FOR SELECT TO anon, authenticated USING (true);