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
  // console.log(newProduct.testImage);
  // Object.values(newProduct.testImage).map((image) => console.log(image));

  // const imageName = Object.values(allImages).map((image) =>
  //   getImageName(image)
  // );

  // const allImageNames = await Promise.all(imageName);
  // console.log(allImageNames);

  // const imagePath = imageNameArray.map(
  //   (imageName) =>
  //     `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`
  // );
  // console.log(imagePath);

  // const imageName = `${Math.floor(Math.random() * 100000)}-${
  //   newProduct.testImage.name
  // }`.replaceAll('/', '');

  // const imagePaths = Object.values(newProduct.testImage).map(
  //   () => `${supabaseUrl}/storage/v1/object/public/product-images/${imageNames}`
  // );
  // console.log(imagePaths);

  // const imagePath = `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;

  // console.log(imageName);
  // console.log(imagePath);

  // 2. upload image
  for (let image of allImages) {
    const imageName = await getImageName(image);
    const imagePath = await getImagePath(imageName);
    imageNameArray.push(imageName);
    imagePathArray.push(imagePath);

    const { error: storageError } = await supabase.storage
      .from('product-images')
      .upload(imageName, image);

    // 3. Delete the product if there was an error uploading the image
    if (storageError) {
      await supabase.from('products').delete().eq('id', image.id);
      console.error(storageError);
      throw new Error(
        'Product image could not be uploaded and product was not created'
      );
    }
  }

  console.log(imageNameArray);
  console.log(imagePathArray);
  // 1. Create product
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
