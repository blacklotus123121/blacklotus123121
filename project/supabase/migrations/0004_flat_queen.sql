/*
  # Add user status management
  
  1. Changes
    - Add status column to profiles table
    - Add status enum type
    - Update RLS policies to include status checks
  
  2. Security
    - Only admins can update user status
*/

-- Create status enum
CREATE TYPE user_status AS ENUM ('active', 'blocked');

-- Add status column to profiles
ALTER TABLE profiles 
ADD COLUMN status user_status NOT NULL DEFAULT 'active';

-- Update policies
CREATE POLICY "Only admins can update user status"
ON profiles
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);