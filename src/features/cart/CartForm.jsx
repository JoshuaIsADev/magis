import { useContext, useState } from 'react';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import styled from 'styled-components';
import { CartContext } from '../../context/cartContext';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function CartForm({
  name,
  selectedProductId,
  color,
  quantity,
  unitPrice,
  mainImage,
  combinedCartItem,
}) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.selectedProductId] = item.quantity;
      return acc;
    }, {})
  );

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

  return (
    <Form onSubmit={(e) => handleSubmit(e, combinedCartItem)}>
      <div>
        {<Img src={mainImage} alt='product' />}
        <p>{name}</p>
        <p>{color}</p>
        <p>{unitPrice}</p>
        <p>{Number(quantity) * Number(unitPrice)}</p>
        <button type='button' onClick={() => handleSubtract(selectedProductId)}>
          -
        </button>
        <input
          type='number'
          name='quantity'
          min='0'
          max='100'
          step='1'
          value={quantities[selectedProductId]}
          onChange={(e) => handleQuantityChange(e, selectedProductId)}
        />
        <button type='button' onClick={() => handleAdd(selectedProductId)}>
          +
        </button>
        <button onClick={(e) => handleDelete(e, selectedProductId)}>
          Remove item
        </button>
        <button type='submit'>Update cart</button>
      </div>
    </Form>
  );
}

export default CartForm;
