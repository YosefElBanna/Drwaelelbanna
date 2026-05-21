-- Supabase database schema for the Doctor Clinic Booking Website
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    booking_type TEXT NOT NULL CHECK (booking_type IN ('in-clinic', 'online')),
    date DATE NOT NULL,
    time_slot TIME NOT NULL,
    payment_status TEXT NOT NULL CHECK (payment_status IN ('unpaid', 'paid', 'refunded')) DEFAULT 'unpaid',
    stripe_session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_datetime_slot UNIQUE(date, time_slot)
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public to insert appointments (since anyone can book)
CREATE POLICY "Public can insert appointments"
ON appointments FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to read appointments (to check availability). 
-- NOTE: In a strictly private app, we might want to restrict which columns public can read.
CREATE POLICY "Public can read appointments"
ON appointments FOR SELECT
TO public
USING (true);
