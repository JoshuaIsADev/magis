import { useContext, useMemo } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import { capitalize } from '../utils/capitalize';
import StyledLink from '../ui/StyledLink';
import CartForm from '../features/cart/CartForm';

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, setCartItems } = useContext(CartContext);

  const getProduct = useMemo(() => {
    return (item) => {
      const itemId = Number(item.selectedProductId.split('-')[1]);
      return products.find((product) => product.id === itemId);
    };
  }, [products]);

  const combinedCartItems = [];

  if (cartItems.length !== 0) {
    cartItems.forEach((item) => {
      const existingItem = combinedCartItems.find(
        (i) => i.selectedProductId === item.selectedProductId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
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
        <StyledLink to='/checkout'>
          <button>Checkout</button>
        </StyledLink>
      </div>
    </>
  );
}

export default Cart;
