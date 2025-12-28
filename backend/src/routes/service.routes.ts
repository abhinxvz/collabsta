import { Router } from 'express';
import { supabase } from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

// Get services for an influencer
router.get('/influencer/:influencerId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('influencer_id', req.params.influencerId)
      .eq('is_active', true);

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create service (influencer only)
router.post('/', authenticate, authorize('influencer'), async (req: AuthRequest, res) => {
  try {
    // Get influencer profile
    const { data: profile } = await supabase
      .from('influencer_profiles')
      .select('id')
      .eq('user_id', req.user!.id)
      .single();

    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    const { data, error } = await supabase
      .from('services')
      .insert({ ...req.body, influencer_id: profile.id })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update service
router.put('/:id', authenticate, authorize('influencer'), async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service
router.delete('/:id', authenticate, authorize('influencer'), async (req, res) => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
