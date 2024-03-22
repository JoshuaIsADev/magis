import { supabaseUrl } from '../services/supabase';

export async function getImagePath(imageName) {
  return `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;
}
