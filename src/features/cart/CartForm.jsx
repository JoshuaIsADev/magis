import { useContext, useState } from 'react';
import Input from '../../ui/Input';
import { VscRemove, VscAdd, VscTrash } from 'react-icons/vsc';
import styled from 'styled-components';
import { CartContext } from '../../context/cartContext';
import Column from '../../ui/Column';
import Row from '../../ui/Row';
import Button from '../../ui/Button';

const OrderButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;
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
    <form onSubmit={(e) => handleSubmit(e, combinedCartItem)}>
      <Row $variation='order'>
        <Column $variation='order'>
          {<Img src={mainImage} alt='product' />}
        </Column>
        <Column $variation='order'>
          <p>{name}</p>
        </Column>
        <Column $variation='order'>
          <p>{color}</p>
        </Column>
        <Column $variation='order'>
          <p>${unitPrice}</p>
        </Column>
        <Column $variation='orderButtons'>
          <OrderButtons>
            <Button
              type='button'
              onClick={() => handleSubtract(selectedProductId)}
            >
              <VscRemove />
            </Button>
            <Input
              $variation='order'
              type='number'
              name='quantity'
              min='0'
              max='100'
              step='1'
              value={quantities[selectedProductId]}
              onChange={(e) => handleQuantityChange(e, selectedProductId)}
            />
            <Button type='button' onClick={() => handleAdd(selectedProductId)}>
              <VscAdd />
            </Button>
          </OrderButtons>
          <Button type='submit'>Update cart</Button>
        </Column>
        <Column $variation='order'>
          <Button onClick={(e) => handleDelete(e, selectedProductId)}>
            <VscTrash />
          </Button>
        </Column>
      </Row>
    </form>
  );
}

export default CartForm;
