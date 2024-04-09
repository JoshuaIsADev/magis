import { useMemo } from 'react';

function useProductFinder(products) {
  const getProduct = useMemo(() => {
    return (item) => {
      const itemId = Number(item.selectedProductId.split('-')[1]);
      return products.find((product) => product.id === itemId);
    };
  }, [products]);

  return getProduct;
}

export default useProductFinder;
