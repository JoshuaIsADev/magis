import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import styled from 'styled-components';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems } = useContext(CartContext);

  function getProduct(item) {
    const itemId = Number(item.selectedProductId.split('-')[1]);
    return products.find((product) => product.id === itemId);
  }

  const combinedCartItems = [];

  if (cartItems.length !== 0)
    cartItems.forEach((item) => {
      const existingItem = combinedCartItems.find(
        (i) => i.selectedProductId === item.selectedProductId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        combinedCartItems.push({
          selectedProductId: item.selectedProductId,
          quantity: item.quantity,
        });
      }
    });

  if (isPending) return <Spinner />;

  return (
    <>
      {combinedCartItems.map((combinedCartItem) => {
        const { name, id, image, unitPrice } = getProduct(combinedCartItem);
        const mainImage = image.find((img) => img.includes('main'));

        return (
          <div key={id + '-' + Math.floor(Math.random() * 1000)}>
            {<Img src={mainImage} alt='product' />}
            <p>{name}</p>
            <p>{unitPrice}</p>
            <p>{combinedCartItem.quantity}</p>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
