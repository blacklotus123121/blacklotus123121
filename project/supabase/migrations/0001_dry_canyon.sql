/*
  # Initial Schema Setup for DeepFake SaaS

  1. New Tables
    - `profiles`
      - User profiles with credit balance and role
    - `plans`
      - Available subscription plans
    - `api_configs`
      - Admin API configuration settings
    - `transactions`
      - Credit usage history

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create plans table
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  credits int NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text NOT NULL,
  role user_role DEFAULT 'user',
  credits int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create API configs table
CREATE TABLE api_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key text NOT NULL,
  endpoint_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  type text NOT NULL,
  credits_used int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view plans"
  ON plans FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage API configs"
  ON api_configs FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Insert default plans
INSERT INTO plans (name, credits, price) VALUES
  ('Starter', 100, 9.99),
  ('Pro', 500, 39.99),
  ('Enterprise', 2000, 149.99);