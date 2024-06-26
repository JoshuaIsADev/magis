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

export async function createEditProduct(newProduct, id) {
  function hasVariantImagePath(variant) {
    return variant.variantImage?.startsWith?.(supabaseUrl);
  }
  let variantImageNameArray = [];
  let variantImagePathArray = [];

  for (let variant of newProduct.variants) {
    const variantImageName = hasVariantImagePath(variant)
      ? variant.variantImage
      : await getImageName(variant.variantImage[0]);
    const variantImagePath = hasVariantImagePath(variant)
      ? variant.variantImage
      : await getImagePath(variantImageName);
    console.log(variant);

    variantImageNameArray.push(variantImageName);
    variantImagePathArray.push(variantImagePath);

    const { error: storageError } = hasVariantImagePath(variant)
      ? variant.variantImage
      : await supabase.storage
          .from('product-images')
          .upload(variantImageName, variant.variantImage[0]);
    if (storageError) {
      await supabase
        .from('products')
        .delete()
        .eq('id', variant.variantImage[0].id);
      console.error(storageError);
      throw new Error(
        'Product image could not be uploaded and product was not created'
      );
    }
    variant.variantImage = variantImagePath;
  }

  function hasImagePath(image) {
    return image?.startsWith?.(supabaseUrl);
  }

  let imageNameArray = [];
  let imagePathArray = [];

  // 1. upload image
  for (let image of newProduct.image) {
    const imageName = hasImagePath(image) ? image : await getImageName(image);
    const imagePath = hasImagePath(image)
      ? image
      : await getImagePath(imageName);

    imageNameArray.push(imageName);
    imagePathArray.push(imagePath);

    const { error: storageError } = hasImagePath(image)
      ? image
      : await supabase.storage.from('product-images').upload(imageName, image);

    // 2. Delete the product if there was an error uploading the image
    if (storageError) {
      await supabase.from('products').delete().eq('id', image.id);
      console.error(storageError);
      throw new Error(
        'Product image could not be uploaded and product was not created'
      );
    }
  }

  // 3. Create/edit product
  // a. Create product
  let query = supabase.from('products');
  if (!id) query = query.insert([{ ...newProduct, image: imagePathArray }]);

  // b. edit
  if (id)
    query = query
      .update({ ...newProduct, image: imagePathArray })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();

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
