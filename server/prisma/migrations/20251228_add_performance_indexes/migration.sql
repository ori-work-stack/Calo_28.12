-- Performance Optimization Migration
-- Adds critical indexes to improve query performance across the application

-- Add indexes to Session table for faster auth lookups and session cleanup
CREATE INDEX IF NOT EXISTS "Session_user_id_idx" ON "sessions"("user_id");
CREATE INDEX IF NOT EXISTS "Session_expiresAt_idx" ON "sessions"("expiresAt");

-- Add indexes to Meal table for faster meal queries
CREATE INDEX IF NOT EXISTS "Meal_user_id_upload_time_idx" ON "Meal"("user_id", "upload_time");
CREATE INDEX IF NOT EXISTS "Meal_meal_period_idx" ON "Meal"("meal_period");

-- Add indexes to DailyActivitySummary for faster activity queries
CREATE INDEX IF NOT EXISTS "DailyActivitySummary_user_id_date_idx" ON "daily_activity_summaries"("user_id", "date");
CREATE INDEX IF NOT EXISTS "DailyActivitySummary_date_idx" ON "daily_activity_summaries"("date");

-- These indexes will significantly improve:
-- 1. Authentication and session validation speed
-- 2. Meal history and filtering queries
-- 3. Daily activity data retrieval
-- 4. Calendar and statistics calculations
