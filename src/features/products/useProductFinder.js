function useProductFinder(products) {
  const getProduct = (item) => {
    const itemId = Number(item.selectedProductId);
    return products.find((product) => product.id === itemId);
  };

  return getProduct;
}

export default useProductFinder;
