import { useContext, useState } from 'react';
import Input from '../../ui/Input';
import { VscRemove, VscAdd, VscTrash } from 'react-icons/vsc';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/cartContext';
import Button from '../../ui/Button';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';
import Img from '../../ui/Img';

const StyledCartForm = styled.form`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: auto;
  justify-content: flex-end;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

function CartForm({
  name,
  selectedVariantId,
  color,
  quantity,
  unitPrice,
  image,
  combinedCartItem,
}) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.selectedVariantId] = item.quantity;
      return acc;
    }, {})
  );

  function handleAdd(selectedVariantId) {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [selectedVariantId]: (prevQuantities[selectedVariantId] || 0) + 1,
    }));
  }

  function handleSubtract(selectedVariantId) {
    if (quantities[selectedVariantId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [selectedVariantId]: prevQuantities[selectedVariantId] - 1,
      }));
    }
  }

  function handleQuantityChange(e, selectedVariantId) {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [selectedVariantId]: newQuantity,
      }));
    }
  }

  function handleDelete(e, selectedVariantId) {
    e.preventDefault();
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.selectedVariantId !== selectedVariantId
    );
    setCartItems(updatedCartItems);
    toast.success('Removed item');
  }

  function handleSubmit(e, item) {
    e.preventDefault();
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.selectedVariantId === item.selectedVariantId) {
        return { ...cartItem, quantity: quantities[item.selectedVariantId] };
      }

      return cartItem;
    });
    setCartItems(updatedCartItems);
  }

  // console.log(cartItems);

  return (
    <StyledCartForm onSubmit={(e) => handleSubmit(e, combinedCartItem)}>
      <InfoContainer>
        <Heading as='h3'>{name}</Heading>
        <p>${unitPrice}</p>
        <p>{color}</p>
      </InfoContainer>
      <Img $variation='productCard' src={image} alt='product' />
      <ButtonsContainer>
        <OrderButtons>
          <Button
            type='button'
            onClick={() => handleSubtract(selectedVariantId)}
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
            value={quantities[selectedVariantId]}
            onChange={(e) => handleQuantityChange(e, selectedVariantId)}
          />
          <Button type='button' onClick={() => handleAdd(selectedVariantId)}>
            <VscAdd />
          </Button>
        </OrderButtons>
        <Button type='submit'>Update</Button>
        <Button
          $variation='trash'
          onClick={(e) => handleDelete(e, selectedVariantId)}
        >
          <VscTrash />
        </Button>
      </ButtonsContainer>
    </StyledCartForm>
  );
}

export default CartForm;
