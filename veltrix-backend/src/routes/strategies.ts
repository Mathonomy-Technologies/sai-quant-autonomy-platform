// src/routes/strategies.ts
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Create a new strategy
router.post('/', async (req, res) => {
  const { user_id, name, pine_script, timeframe, duration, max_amount } = req.body;

  const { data, error } = await supabase.from('strategies').insert([
    {
      user_id,
      name,
      pine_script,
      timeframe,
      duration,
      max_amount,
      is_active: false,
    },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ strategy: data });
});

// Get all strategies for a user
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('strategies')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ strategies: data });
});

// Toggle active strategy
router.patch('/:strategy_id/activate', async (req, res) => {
  const { strategy_id } = req.params;
  const { is_active } = req.body;

  const { data, error } = await supabase
    .from('strategies')
    .update({ is_active })
    .eq('id', strategy_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ updated: data });
});

export default router;
