import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { capitalize } from '../utils/capitalize';
import { useProducts } from '../features/products/useProducts';
import styled from 'styled-components';
import CreateOrderForm from '../features/order/CreateOrderForm';
import Spinner from '../ui/Spinner';
import useProductFinder from '../features/products/useProductFinder';
import { constructCartItem } from '../utils/constructCartItem';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function CheckOut() {
  const { isPending, products } = useProducts();
  const { cartItems } = useContext(CartContext);
  const getProduct = useProductFinder(products);

  const combinedCartItems = [];

  cartItems.forEach((item) => {
    combinedCartItems.push(constructCartItem(item, getProduct, capitalize));
  });

  console.log(cartItems);

  if (isPending) return <Spinner />;

  return (
    <>
      <div>
        {combinedCartItems.map((combinedCartItem) => (
          <div key={combinedCartItem.id}>
            <Img src={combinedCartItem.mainImage} alt='product' />
            <p>{combinedCartItem.name}</p>
            <p>{combinedCartItem.color}</p>
            <p>{combinedCartItem.unitPrice}</p>
            <p>{combinedCartItem.quantity}</p>
            <p>
              {Number(combinedCartItem.quantity) *
                Number(combinedCartItem.unitPrice)}
            </p>
          </div>
        ))}
      </div>
      <div>
        <p>Total Price</p>
        <p></p>
      </div>
      <CreateOrderForm />
    </>
  );
}

export default CheckOut;
