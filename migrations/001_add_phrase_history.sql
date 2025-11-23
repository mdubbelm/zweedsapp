-- Migration: Add phrase_history column to user_progress table
-- Version: 1.10.0
-- Date: 2025-11-21
-- Description: Adds phrase history tracking for smart repetition

-- Add the new column
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS phrase_history JSONB DEFAULT '{}';

-- Add index for better query performance (optional, but recommended)
CREATE INDEX IF NOT EXISTS idx_user_progress_phrase_history
ON user_progress USING gin(phrase_history);

-- Verify the change
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'user_progress' AND column_name = 'phrase_history';
