import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { capitalize } from '../utils/capitalize';
import { useProducts } from '../features/products/useProducts';
import styled from 'styled-components';
import CreateOrderForm from '../features/order/CreateOrderForm';
import Spinner from '../ui/Spinner';
import useProductFinder from '../features/products/useProductFinder';

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
    const productdata = getProduct(item);
    const mainImage = productdata.image.find((img) => img.includes('main'));
    combinedCartItems.push({
      selectedProductId: item.selectedProductId,
      quantity: item.quantity,
      color: capitalize(item.selectedProductId.split('-')[0]),
      name: productdata.name,
      unitPrice: productdata.unitPrice,
      mainImage,
      id: productdata.id,
    });
  });

  // console.log(combinedCartItems);

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
      <CreateOrderForm />
    </>
  );
}

export default CheckOut;
