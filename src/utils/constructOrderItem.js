export function constructOrderItem(item, getProduct, capitalize) {
  // console.log(item[0].quantity);
  // console.log(getProduct(item.orderedProducts[0]));
  const productData = item.orderedProducts.map((order) => {
    return getProduct(order);
  });
  // console.log(productData);
  // console.log(item.email);
  // const productdata = getProduct(item);
  // const mainImage = productdata.image.find((img) => img.includes('main'));
  return {
    // quantity: item.quantity,
    // color: capitalize(item.selectedProductId.split('-')[0]),
    // name: productdata.name,
    // unitPrice: productdata.unitPrice,
    // mainImage,
    // id: productdata.id,
  };
}
