import { useContext, useState } from 'react';
import Input from '../../ui/Input';
import { VscRemove, VscAdd, VscTrash } from 'react-icons/vsc';
import styled from 'styled-components';
import { CartContext } from '../../context/cartContext';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';

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
const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
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
    <StyledCartForm onSubmit={(e) => handleSubmit(e, combinedCartItem)}>
      <ImageContainer>{<Img src={mainImage} alt='product' />}</ImageContainer>
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
              <Button
                type='button'
                onClick={() => handleAdd(selectedProductId)}
              >
                <VscAdd />
              </Button>
            </OrderButtons>
            <Button type='submit'>Update</Button>
            <Button
              $variation='trash'
              onClick={(e) => handleDelete(e, selectedProductId)}
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
