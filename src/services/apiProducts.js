import { getImageName } from '../utils/getImageName';
import { getImagePath } from '../utils/getImagePath';
import supabase, { supabaseUrl } from './supabase';

export async function getProducts() {
  let { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error(error);
    throw new Error('Products could not be loaded');
  }

  return data;
}

export async function createProduct(newProduct) {
  const allImages = newProduct.image;
  let imageNameArray = [];
  let imagePathArray = [];

  // 1. upload image
  for (let image of allImages) {
    const imageName = await getImageName(image);
    const imagePath = await getImagePath(imageName);
    imageNameArray.push(imageName);
    imagePathArray.push(imagePath);

    const { error: storageError } = await supabase.storage
      .from('product-images')
      .upload(imageName, image);

    // 2. Delete the product if there was an error uploading the image
    if (storageError) {
      await supabase.from('products').delete().eq('id', image.id);
      console.error(storageError);
      throw new Error(
        'Product image could not be uploaded and product was not created'
      );
    }
  }

  // 3. Create product
  const { data, error } = await supabase
    .from('products')
    .insert([{ ...newProduct, image: imagePathArray }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Product could not be created');
  }

  return data;
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Product could not be deleted');
  }
  return data;
}
