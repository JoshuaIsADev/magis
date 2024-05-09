import { useContext, useState } from 'react';
import Input from '../../ui/Input';
import { VscRemove, VscAdd, VscTrash } from 'react-icons/vsc';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { CartContext } from '../../context/cartContext';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Img from '../../ui/Img';

const StyledCartForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-bottom: var(--border);
`;

const ImageContainer = styled.div`
  grid-column: 1 / span 1;
  padding: var(--cell);
`;

const InfoContainer = styled.div`
  grid-column: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--cell);
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

  return (
    <StyledCartForm onSubmit={(e) => handleSubmit(e, combinedCartItem)}>
      <ImageContainer>
        {<Img $variation='orderCard' src={image} alt='product' />}
      </ImageContainer>
      <InfoContainer>
        <InfoRow>
          <Heading as='h3'>{name}</Heading>

          <p>${unitPrice}</p>
        </InfoRow>
        <InfoRow>
          <p>{color}</p>
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
              <Button
                type='button'
                onClick={() => handleAdd(selectedVariantId)}
              >
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
        </InfoRow>
      </InfoContainer>
    </StyledCartForm>
  );
}

export default CartForm;
