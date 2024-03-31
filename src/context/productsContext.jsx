import { createContext, useEffect, useState } from 'react';
import { getProducts } from '../services/apiProducts';
import { useProducts } from '../features/products/useProducts';

//1) create a context
export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const productsData = useProducts();
  // console.log(productsData);

  // const value = { products };
  return (
    <ProductContext.Provider value={productsData}>
      {' '}
      {children}
    </ProductContext.Provider>
  );
};
