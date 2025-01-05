/*
  # Create students table

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `age` (integer, required)
      - `class` (text, required)
      - `phone_number` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `students` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL,
  class text NOT NULL,
  phone_number text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Users can read all students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert students"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update students"
  ON students
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete students"
  ON students
  FOR DELETE
  TO authenticated
  USING (true);