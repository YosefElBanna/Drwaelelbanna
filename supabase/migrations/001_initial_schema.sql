-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  country_code TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed' NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting bookings (public can insert)
CREATE POLICY "Allow public insert to bookings" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users (admin) to read bookings
CREATE POLICY "Allow authenticated to read bookings" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users (admin) to update bookings
CREATE POLICY "Allow authenticated to update bookings" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true);
