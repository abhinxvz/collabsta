import { Router } from 'express';
import { supabase } from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

// Create order
router.post('/', authenticate, authorize('brand'), async (req: AuthRequest, res) => {
  try {
    const { serviceId, requirements } = req.body;

    // Get service details
    const { data: service } = await supabase
      .from('services')
      .select('*, influencer_profiles(id)')
      .eq('id', serviceId)
      .single();

    if (!service) return res.status(404).json({ error: 'Service not found' });

    // Get brand profile
    const { data: brand } = await supabase
      .from('brand_profiles')
      .select('id')
      .eq('user_id', req.user!.id)
      .single();

    const platformFee = service.price * 0.1; // 10% platform fee
    const orderNumber = `COL${Date.now()}`;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        brand_id: brand?.id,
        influencer_id: service.influencer_profiles.id,
        service_id: serviceId,
        amount: service.price,
        platform_fee: platformFee,
        requirements,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/my-orders', authenticate, async (req: AuthRequest, res) => {
  try {
    const { role } = req.user!;
    const profileTable = role === 'brand' ? 'brand_profiles' : 'influencer_profiles';
    const orderField = role === 'brand' ? 'brand_id' : 'influencer_id';

    const { data: profile } = await supabase
      .from(profileTable)
      .select('id')
      .eq('user_id', req.user!.id)
      .single();

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        services(*),
        brand_profiles(users(full_name)),
        influencer_profiles(users(full_name, avatar_url))
      `)
      .eq(orderField, profile?.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:id/status', authenticate, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
