import { Router } from 'express';
import { supabase } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get messages for an order
router.get('/order/:orderId', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users(full_name, avatar_url)')
      .eq('order_id', req.params.orderId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { orderId, content } = req.body;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        order_id: orderId,
        sender_id: req.user!.id,
        content,
      })
      .select('*, sender:users(full_name, avatar_url)')
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Mark messages as read
router.patch('/read/:orderId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('order_id', req.params.orderId)
      .neq('sender_id', req.user!.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
