import { useContext } from 'react';
import { ProductContext } from '../context/productsContext';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import { useMainImage } from '../features/products/useMainImage';
import Spinner from '../ui/Spinner';

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems } = useContext(CartContext);
  // console.log(products);
  // console.log(cartItems);

  const combinedCartItems = [];

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
  console.log(combinedCartItems);

  if (isPending) return <Spinner />;

  // const mainImage = useMainImage(products.image);
  // console.log(mainImage);
  return (
    <>
      {combinedCartItems.map((combinedCartItem) => {
        // console.log(combinedCartItem);
        return (
          <div key={Math.floor(Math.random() * 100)}>
            <p>{combinedCartItem.selectedProductId}</p>
            {/* <p>{combinedCartItem.color}</p> */}
            <p>{combinedCartItem.quantity}</p>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
