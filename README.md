# Collabsta

Indian influencer marketing marketplace connecting brands with creators on Instagram, YouTube, and X.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Zustand
- **Backend**: Express.js, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Cache**: Redis

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configure your env vars
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local  # Configure your env vars
npm run dev
```

### Database
Run the migration in `database/migrations/001_initial_schema.sql` in your Supabase SQL editor.

## Features

- Influencer discovery with filters (platform, category, city, price)
- Influencer profiles with portfolio and reviews
- Service listings and pricing
- Order management with escrow payments
- Real-time messaging
- Brand and influencer dashboards
