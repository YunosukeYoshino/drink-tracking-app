/*
  # Create Drinks Table

  1. New Tables
    - `drinks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.uid)
      - `type` (text, type of drink)
      - `amount` (integer, amount in ml)
      - `created_at` (timestamptz, timestamp of entry)
  2. Security
    - Enable RLS on `drinks` table
    - Add policy for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS drinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid(),
  type text NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE drinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own drinks"
  ON drinks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
