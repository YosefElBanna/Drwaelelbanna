-- Create clinic_settings table
CREATE TABLE IF NOT EXISTS clinic_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  allowed_days INTEGER[] NOT NULL DEFAULT '{5}', -- 0=Sunday, 5=Friday
  time_slots TEXT[] NOT NULL DEFAULT '{"20:30", "21:00", "21:30", "22:00", "22:30", "23:00"}',
  disabled_dates DATE[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure only one row exists (id = 1)
ALTER TABLE clinic_settings ADD CONSTRAINT clinic_settings_single_row CHECK (id = 1);

-- Insert default row if not exists
INSERT INTO clinic_settings (id, allowed_days, time_slots)
VALUES (1, '{5}', '{"20:30", "21:00", "21:30", "22:00", "22:30", "23:00"}')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;

-- Allow public to read settings
CREATE POLICY "Allow public to read clinic_settings" ON clinic_settings
  FOR SELECT
  USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Allow authenticated to update clinic_settings" ON clinic_settings
  FOR UPDATE
  TO authenticated
  USING (true);
