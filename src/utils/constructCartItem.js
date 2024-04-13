import { capitalize } from '../utils/capitalize';

export function constructCartItem(item, getProduct) {
  const productdata = getProduct(item);
  const mainImage = productdata.image.find((img) => img.includes('main'));
  return {
    selectedProductId: item.selectedProductId,
    quantity: item.quantity,
    color: capitalize(item.color),
    name: productdata.name,
    unitPrice: productdata.unitPrice,
    mainImage,
    id: productdata.id,
  };
}
