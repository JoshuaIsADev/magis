import styled from 'styled-components';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import CreateOrderForm from '../features/order/CreateOrderForm';
import Spinner from '../ui/Spinner';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import Img from '../ui/Img';

const StyledCheckOut = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
  padding-bottom: var(--bottom);
`;

const CartContainer = styled.div`
  grid-column: 4 / span 2;
`;

const RowCart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--grid-gap);
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 5rem;
  align-items: left;
  padding: 1rem 2rem 1rem 0;
`;

const TotalContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function CheckOut() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  // const getProduct = useProductFinder(products);

  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);

  console.log(cartItems);

  if (isPending) return <Spinner />;

  return (
    <StyledCheckOut>
      <HeadingContainer text='Checkout' />
      <CreateOrderForm />

      <CartContainer>
        <Heading as='h3' $variation='padding'>
          Order summary
        </Heading>
        {cartItems.map((cartItem) => (
          <RowCart key={cartItem.selectedVariantId}>
            <InfoContainer>
              <ImageContainer>
                <Img src={cartItem.image} alt='product' />
              </ImageContainer>
              <TextContainer>
                <Heading as='h3'>{cartItem.name}</Heading>
                <p>{cartItem.color}</p>
              </TextContainer>
            </InfoContainer>
            <p>
              {cartItem.quantity} x ${cartItem.unitPrice}
            </p>
          </RowCart>
        ))}

        <TotalContainer>
          <Heading as='h3' $variation='padding'>
            Cart totals
          </Heading>
          <RowCart>
            <Heading as='h3'>Subtotal</Heading>
            <p>${totalPrice.toFixed(2)}</p>
          </RowCart>
          <RowCart>
            <Heading as='h3'>Taxes</Heading>
            <p>${taxes}</p>
          </RowCart>
          <RowCart>
            <Heading as='h3'>Total(including taxes)</Heading>
            <p>${finalTotalPrice}</p>
          </RowCart>
        </TotalContainer>
      </CartContainer>
    </StyledCheckOut>
  );
}

export default CheckOut;
