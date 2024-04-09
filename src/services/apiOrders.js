import supabase, { supabaseUrl } from './supabase';

export async function createOrder(newOrder) {
  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Order could not be created');
  }
  return data;
}
