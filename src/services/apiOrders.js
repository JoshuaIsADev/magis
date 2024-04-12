import supabase from './supabase';

export async function getOrders() {
  let { data, error } = await supabase.from('orders').select('*');

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  return data;
}

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
