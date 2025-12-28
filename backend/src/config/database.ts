import { createClient } from '@supabase/supabase-js';
import { createClient as createRedisClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Redis client
export const redis = createRedisClient({ url: process.env.REDIS_URL });

export const connectRedis = async () => {
  await redis.connect();
  console.log('✅ Redis connected');
};
