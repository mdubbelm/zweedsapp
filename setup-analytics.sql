-- Analytics Events Table for Svenska Kat
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE analytics_events (
    id bigserial primary key,
    user_id uuid references auth.users not null,
    event_name text not null,
    properties jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now()
);

-- Index for fast querying by user and event type
CREATE INDEX idx_analytics_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can insert their own events
CREATE POLICY "Users can insert own analytics"
    ON analytics_events FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can view their own analytics (for debugging/insights)
CREATE POLICY "Users can view own analytics"
    ON analytics_events FOR SELECT
    USING (auth.uid() = user_id);

-- Note: Admins/developers need direct database access or service role key
-- to query cross-user analytics for learning outcomes analysis
