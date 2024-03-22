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
  const imageName = `${Math.floor(Math.random() * 100000)}-${
    newProduct.testImage.name
  }`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;

  // const imageUrl

  //https://wuurkebuthemtrftoedw.supabase.co/storage/v1/object/public/product-images/

  // 1. Create product
  const { data, error } = await supabase
    .from('products')
    .insert([{ ...newProduct, testImage: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Product could not be created');
  }

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from('product-images')
    .upload(imageName, newProduct.testImage);

  // 3. Delete the product if there was an error uploading the image
  if (storageError) {
    await supabase.from('products').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Product image could not be uploaded and product was not created'
    );
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
