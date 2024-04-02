import { useContext, useMemo, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import styled from 'styled-components';
import { capitalize } from '../utils/capitalize';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems } = useContext(CartContext);
  // const [itemPrices, setItemPrice] = useState(0);

  // function handleItemPrice(itemPrice) {
  //   setItemPrice((itemPrices) => [...itemPrices, itemPrice]);
  //   console.log(itemPrices);
  // }

  const getProduct = useMemo(() => {
    return (item) => {
      const itemId = Number(item.selectedProductId.split('-')[1]);
      return products.find((product) => product.id === itemId);
    };
  }, [products]);

  const combinedCartItems = [];

  if (cartItems.length !== 0)
    cartItems.forEach((item) => {
      const existingItem = combinedCartItems.find(
        (i) => i.selectedProductId === item.selectedProductId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        const productdata = getProduct(item);
        // console.log(productdata);
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
      }
    });

  console.log(combinedCartItems);

  if (isPending) return <Spinner />;

  return (
    <>
      {combinedCartItems.map((combinedCartItem) => (
        <div key={combinedCartItem.id + '-' + Math.floor(Math.random() * 1000)}>
          {<Img src={combinedCartItem.mainImage} alt='product' />}
          <p>{combinedCartItem.name}</p>
          <p>{combinedCartItem.color}</p>
          <p>{combinedCartItem.unitPrice}</p>
          <p>{combinedCartItem.quantity}</p>
          {/* <button onClick={handleItemPrice}>add</button> */}
        </div>
      ))}
    </>
  );
}

export default Cart;
