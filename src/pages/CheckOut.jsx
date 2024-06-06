import styled from 'styled-components';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import CreateOrderForm from '../features/order/CreateOrderForm';
import Spinner from '../ui/Spinner';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import Img from '../ui/Img';
import { useUser } from '../features/authentication/useUser.js';
import StyledLink from '../ui/StyledLink.jsx';

const StyledCheckOut = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body) var(--bottom);
`;

const CartContainer = styled.div`
  grid-column: 4 / span 2;
  @media (max-width: 1000px) {
    grid-column: 4 / span 3;
    /* grid-row: 2 / span 2; */
  }
  @media (max-width: 500px) {
    grid-column: 1 / span 6;
    grid-row: 1 / span 1;
  }
`;

const RowCart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--grid-gap);
  align-items: center;
  @media (max-width: 1000px) {
    display: flex;
    justify-content: space-between;
  }
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
  const { user, isAuthenticated } = useUser();
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  // const getProduct = useProductFinder(products);

  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);

  if (isPending) return <Spinner />;

  return (
    <StyledCheckOut>
      <HeadingContainer text='Checkout' />
      {user ? (
        <CreateOrderForm />
      ) : (
        <TextContainer>
          <Heading as='h3' $variation='danger'>
            Please{' '}
            <StyledLink $variation='secondary' to='/signin'>
              Sign in
            </StyledLink>{' '}
            to checkout.
          </Heading>
        </TextContainer>
      )}

      <CartContainer>
        <Heading as='h2' $variation='bold' $paddingBottom='2rem'>
          Order summary
        </Heading>
        {cartItems.map((cartItem) => (
          <RowCart key={cartItem.selectedVariantId}>
            <InfoContainer>
              <ImageContainer>
                <Img src={cartItem.image} alt='product' />
              </ImageContainer>
              <TextContainer>
                <Heading as='h3' $variation='bold'>
                  {cartItem.name}
                </Heading>
                <p>{cartItem.color}</p>
              </TextContainer>
            </InfoContainer>
            <p>
              {cartItem.quantity} x ${cartItem.unitPrice}
            </p>
          </RowCart>
        ))}

        <TotalContainer>
          <Heading as='h2' $variation='bold' $paddingBottom='2rem'>
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
