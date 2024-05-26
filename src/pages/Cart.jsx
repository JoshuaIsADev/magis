import styled from 'styled-components';
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import StyledLink from '../ui/StyledLink';
import CartForm from '../features/cart/CartForm';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import Button from '../ui/Button';

const StyledCart = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body) var(--bottom);
`;

const SummaryContainer = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
  @media (max-width: 1400px) {
    grid-column: 1 / span 2;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);

  if (isPending) return <Spinner />;

  return (
    <StyledCart>
      <HeadingContainer text='Your shopping cart' />
      {cartItems.length === 0 && (
        <Heading as='h3' $variation='danger'>
          Your cart is empty.
        </Heading>
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

      <SummaryContainer>
        <Heading as='h3'>Order summary</Heading>
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
  );
}

export default Cart;
