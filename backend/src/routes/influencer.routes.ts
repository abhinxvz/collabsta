import { Router } from 'express';
import { supabase, redis } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all influencers with filters
router.get('/', async (req, res) => {
  try {
    const { platform, category, city, minFollowers, maxPrice, page = 1, limit = 20 } = req.query;
    const cacheKey = `influencers:${JSON.stringify(req.query)}`;

    // Check cache
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    let query = supabase
      .from('influencer_profiles')
      .select(`
        *,
        users(full_name, avatar_url),
        social_accounts(*),
        services(*)
      `)
      .eq('users.is_active', true)
      .range((+page - 1) * +limit, +page * +limit - 1);

    if (city) query = query.eq('city', city);
    if (category) query = query.contains('categories', [category]);
    if (maxPrice) query = query.lte('base_price', maxPrice);

    const { data, error } = await query;
    if (error) throw error;

    // Cache for 5 minutes
    await redis.setEx(cacheKey, 300, JSON.stringify(data));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single influencer
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('influencer_profiles')
      .select(`
        *,
        users(full_name, avatar_url, email),
        social_accounts(*),
        services(*),
        portfolio_items(*),
        reviews(*, brand_profiles(users(full_name)))
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update influencer profile
router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('influencer_profiles')
      .update(req.body)
      .eq('user_id', req.user!.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
