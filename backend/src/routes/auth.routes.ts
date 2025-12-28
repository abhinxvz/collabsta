import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/database';
import { z } from 'zod';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  role: z.enum(['brand', 'influencer']),
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, role } = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('users')
      .insert({ email, password_hash: passwordHash, full_name: fullName, role })
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign(
      { id: data.id, email: data.email, role: data.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ user: data, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ user, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
