/*
  # Payment Gateway Integration

  1. New Tables
    - `payment_gateway_settings`
      - `id` (uuid, primary key)
      - `pix_key` (text)
      - `api_token` (text)
      - `webhook_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
  2. Security
    - Enable RLS on `payment_gateway_settings` table
    - Add policy for admin access only
*/

CREATE TABLE payment_gateway_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pix_key text,
  api_token text,
  webhook_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payment_gateway_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage payment settings"
  ON payment_gateway_settings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));