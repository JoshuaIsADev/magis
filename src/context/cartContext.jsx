import { createContext, useState, useEffect } from 'react';

//1)create a context
export const CartContext = createContext({
  cartItems: null,
  setCartItems: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const value = { cartItems, setCartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
