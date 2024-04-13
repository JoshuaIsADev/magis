import { createContext, useState, useEffect } from 'react';

//1)create a context
export const CartContext = createContext({
  cartItems: null,
  totalPrice: 0,
  setCartItems: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.unitPrice * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  const value = { cartItems, totalPrice, setCartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
