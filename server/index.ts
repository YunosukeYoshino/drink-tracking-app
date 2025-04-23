import { Hono } from 'hono';
import { serve } from 'hono/node-server';
import { createClient } from '@supabase/supabase-js';

const app = new Hono();
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.get('/api/drinks', async (c) => {
  try {
    const { data, error } = await supabase.from('drinks').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return c.json(data || []);
  } catch (error) {
    console.error('Error fetching drinks:', error);
    return c.json({ error: 'Failed to fetch drinks' }, 500);
  }
});

app.post('/api/drinks', async (c) => {
  try {
    const { type, amount } = await c.req.json();
    const { data, error } = await supabase.from('drinks').insert([{ type, amount }]).select();
    if (error) throw error;
    return c.json(data[0], 201);
  } catch (error) {
    console.error('Error adding drink:', error);
    return c.json({ error: 'Failed to add drink' }, 500);
  }
});

app.get('/api/stats', async (c) => {
  try {
    const { data, error } = await supabase.from('drinks').select('amount');
    if (error) throw error;
    const totalAmount = data?.reduce((sum, drink) => sum + drink.amount, 0) || 0;
    return c.json({ totalAmount });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
