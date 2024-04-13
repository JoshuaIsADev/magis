import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import { capitalize } from '../utils/capitalize';
import StyledLink from '../ui/StyledLink';
import CartForm from '../features/cart/CartForm';
import useProductFinder from '../features/products/useProductFinder';
import { constructCartItem } from '../utils/constructCartItem';

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const getProduct = useProductFinder(products);

  const combinedCartItems = [];

  if (cartItems.length !== 0) {
    cartItems.forEach((item) => {
      const existingItem = combinedCartItems.find(
        (i) => i.selectedProductId === item.selectedProductId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        combinedCartItems.push(constructCartItem(item, getProduct, capitalize));
      }
    });
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <div>
        {combinedCartItems.map((combinedCartItem) => (
          <CartForm
            key={combinedCartItem.id + combinedCartItem.color}
            name={combinedCartItem.name}
            selectedProductId={combinedCartItem.selectedProductId}
            color={combinedCartItem.color}
            quantity={combinedCartItem.quantity}
            unitPrice={combinedCartItem.unitPrice}
            mainImage={combinedCartItem.mainImage}
            combinedCartItem={combinedCartItem}
          />
        ))}
      </div>
      <div>
        <h2>Total price: {totalPrice}</h2>
      </div>
      <div>
        <StyledLink to='/checkout'>
          <button>Checkout</button>
        </StyledLink>
      </div>
    </>
  );
}

export default Cart;
