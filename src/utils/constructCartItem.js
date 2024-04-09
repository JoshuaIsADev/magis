export function constructCartItem(item, getProduct, capitalize) {
  const productdata = getProduct(item);
  const mainImage = productdata.image.find((img) => img.includes('main'));
  return {
    selectedProductId: item.selectedProductId,
    quantity: item.quantity,
    color: capitalize(item.selectedProductId.split('-')[0]),
    name: productdata.name,
    unitPrice: productdata.unitPrice,
    mainImage,
    id: productdata.id,
  };
}
