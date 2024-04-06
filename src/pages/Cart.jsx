import { useContext, useMemo, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import styled from 'styled-components';
import { capitalize } from '../utils/capitalize';
import StyledLink from '../ui/StyledLink';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.selectedProductId] = item.quantity;
      return acc;
    }, {})
  );
  console.log(cartItems);

  const handleAdd = (selectedProductId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [selectedProductId]: (prevQuantities[selectedProductId] || 0) + 1,
    }));
  };

  const handleSubtract = (selectedProductId) => {
    if (quantities[selectedProductId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [selectedProductId]: prevQuantities[selectedProductId] - 1,
      }));
    }
  };

  function handleQuantityChange(e, selectedProductId) {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [selectedProductId]: newQuantity,
      }));
    }
  }

  function handleDelete(e, selectedProductId) {
    e.preventDefault();
    // console.log(cartItems[0].selectedProductId);
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.selectedProductId !== selectedProductId
    );
    setCartItems(updatedCartItems);
    console.log(updatedCartItems);
  }

  function handleSubmit(e, item) {
    e.preventDefault();
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.selectedProductId === item.selectedProductId) {
        return { ...cartItem, quantity: quantities[item.selectedProductId] };
      }

      return cartItem;
    });
    setCartItems(updatedCartItems);
  }

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
          <form
            onSubmit={(e) => handleSubmit(e, combinedCartItem)}
            key={combinedCartItem.id + combinedCartItem.color}
          >
            <div>
              {<Img src={combinedCartItem.mainImage} alt='product' />}
              <p>{combinedCartItem.name}</p>
              <p>{combinedCartItem.color}</p>
              <p>{combinedCartItem.unitPrice}</p>
              {/* <p>{combinedCartItem.quantity}</p> */}
              <p>
                {Number(combinedCartItem.quantity) *
                  Number(combinedCartItem.unitPrice)}
              </p>
              <button
                type='button'
                onClick={() =>
                  handleSubtract(combinedCartItem.selectedProductId)
                }
              >
                -
              </button>
              <input
                type='number'
                name='quantity'
                min='0'
                max='100'
                step='1'
                value={quantities[combinedCartItem.selectedProductId]}
                onChange={(e) =>
                  handleQuantityChange(e, combinedCartItem.selectedProductId)
                }
              />
              <button
                type='button'
                onClick={() => handleAdd(combinedCartItem.selectedProductId)}
              >
                +
              </button>
              <button
                onClick={(e) =>
                  handleDelete(e, combinedCartItem.selectedProductId)
                }
              >
                Remove item
              </button>
              <button type='submit'>Update cart</button>
            </div>
          </form>
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
