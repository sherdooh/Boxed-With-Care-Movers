/*
  # Create quote_requests table

  ## Summary
  Creates the quote_requests table to store customer move quote requests
  submitted via the website contact form.

  ## New Tables
  - `quote_requests`
    - `id` (uuid, primary key)
    - `name` (text) - customer full name
    - `email` (text) - customer email (optional)
    - `phone` (text) - customer phone number
    - `from_location` (text) - origin location
    - `to_location` (text) - destination location
    - `move_date` (text) - preferred move date
    - `move_type` (text) - type of move selected
    - `message` (text) - additional details
    - `created_at` (timestamptz) - submission timestamp

  ## Security
  - RLS enabled
  - Anonymous users can INSERT (submit quote requests)
  - No SELECT policy for anonymous users (admin access only via service role)
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  from_location text NOT NULL DEFAULT '',
  to_location text NOT NULL DEFAULT '',
  move_date text NOT NULL DEFAULT '',
  move_type text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);
