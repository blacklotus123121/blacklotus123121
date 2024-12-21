/*
  # Fix RLS policies for profiles table

  1. Changes
    - Update profiles table RLS policies to allow proper profile creation and management
    - Add policy for inserting new profiles
    - Add policy for updating own profile
  
  2. Security
    - Maintain security while allowing necessary operations
    - Ensure users can only manage their own profiles
*/

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

-- Create new policies for profiles
CREATE POLICY "Users can manage their own profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow profile creation during signup
CREATE POLICY "Enable insert for authenticated users only"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow reading profiles for authenticated users
CREATE POLICY "Enable read access for authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);