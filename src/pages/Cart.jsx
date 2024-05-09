import styled from 'styled-components';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import StyledLink from '../ui/StyledLink';
import CartForm from '../features/cart/CartForm';
import Heading from '../ui/Heading';
import Button from '../ui/Button';

const StyledCart = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    ' cartHeading summaryHeading'
    'cart summary';
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
  padding-top: var(--top);
`;

const HeadingContainer = styled.div`
  grid-area: cartHeading;
  padding: var(--cell);
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
`;

const SummaryHeadingContainer = styled.div`
  grid-area: summaryHeading;
  padding: var(--cell);
  border-bottom: var(--border);
`;

const CartContainer = styled.div`
  grid-area: cart;
  padding-bottom: 30vh;
  border-right: var(--border);
`;
const SummaryContainer = styled.div`
  grid-area: summary;
  display: flex;
  flex-direction: column;
  padding: var(--cell);
  gap: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyCartContainer = styled.div`
  padding: var(--cell);
`;

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);
  if (cartItems.length === 0) {
    console.log('cart is empty');
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <StyledCart>
        <HeadingContainer>
          <Heading as='h3'>Cart</Heading>
        </HeadingContainer>
        <SummaryHeadingContainer>
          <Heading as='h3'>Order summary</Heading>
        </SummaryHeadingContainer>
        <CartContainer>
          {cartItems.length === 0 && (
            <EmptyCartContainer>
              <Heading as='h3' $variation='danger'>
                Cart is empty
              </Heading>
            </EmptyCartContainer>
          )}
          {cartItems.map((cartItem) => (
            <CartForm
              key={cartItem.selectedVariantId}
              name={cartItem.name}
              selectedVariantId={cartItem.selectedVariantId}
              color={cartItem.color}
              quantity={cartItem.quantity}
              unitPrice={cartItem.unitPrice}
              image={cartItem.image}
              combinedCartItem={cartItem}
            />
          ))}
        </CartContainer>
        <SummaryContainer>
          <InfoRow>
            <Heading as='h3'>Subtotal</Heading>
            <p>${totalPrice.toFixed(2)}</p>
          </InfoRow>
          <InfoRow>
            <Heading as='h3'>Taxes</Heading>
            <p>${taxes}</p>
          </InfoRow>
          <InfoRow>
            <Heading as='h3'>Total(including taxes)</Heading>
            <p>${finalTotalPrice}</p>
          </InfoRow>
          <InfoRow>
            {cartItems.length !== 0 && (
              <StyledLink to='/checkout'>
                <Button $variation='primary'>Proceed to checkout</Button>
              </StyledLink>
            )}
          </InfoRow>
        </SummaryContainer>
      </StyledCart>
    </>
  );
}

export default Cart;
