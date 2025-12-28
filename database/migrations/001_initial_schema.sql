-- Collabsta Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE user_role AS ENUM ('brand', 'influencer', 'admin');
CREATE TYPE platform_type AS ENUM ('instagram', 'youtube', 'tiktok', 'moj', 'sharechat', 'josh');
CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'in_progress', 'delivered', 'revision', 'completed', 'cancelled', 'disputed');
CREATE TYPE content_type AS ENUM ('post', 'reel', 'story', 'video', 'ugc', 'shorts');

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'brand',
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INFLUENCER PROFILES
CREATE TABLE influencer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  languages TEXT[], -- ['Hindi', 'English', 'Tamil']
  categories TEXT[], -- ['Fashion', 'Tech', 'Food']
  base_price DECIMAL(10,2),
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOCIAL ACCOUNTS (linked platforms)
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  influencer_id UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  platform platform_type NOT NULL,
  username VARCHAR(255) NOT NULL,
  profile_url TEXT,
  followers INT DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(influencer_id, platform)
);

-- SERVICES (what influencers offer)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  influencer_id UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  platform platform_type NOT NULL,
  content_type content_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  delivery_days INT DEFAULT 7,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BRAND PROFILES
CREATE TABLE brand_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  website VARCHAR(255),
  industry VARCHAR(100),
  gst_number VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  brand_id UUID REFERENCES brand_profiles(id),
  influencer_id UUID REFERENCES influencer_profiles(id),
  service_id UUID REFERENCES services(id),
  status order_status DEFAULT 'pending',
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  requirements TEXT,
  delivered_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID UNIQUE REFERENCES orders(id),
  influencer_id UUID REFERENCES influencer_profiles(id),
  brand_id UUID REFERENCES brand_profiles(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PORTFOLIO ITEMS
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  influencer_id UUID REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type VARCHAR(20), -- 'image', 'video'
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_influencer_city ON influencer_profiles(city);
CREATE INDEX idx_influencer_categories ON influencer_profiles USING GIN(categories);
CREATE INDEX idx_social_platform ON social_accounts(platform);
CREATE INDEX idx_services_platform ON services(platform);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_messages_order ON messages(order_id);

-- ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
