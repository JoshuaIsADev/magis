import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import StyledLink from '../ui/StyledLink';
import CartForm from '../features/cart/CartForm';
import useProductFinder from '../features/products/useProductFinder';
import { constructCartItem } from '../utils/constructCartItem';
import Hr from '../ui/Hr';
import Column from '../ui/Column';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import styled from 'styled-components';

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
  border-bottom: var(--border);
`;
const SummaryHeadingContainer = styled.div`
  grid-area: summaryHeading;
  padding: var(--cell);
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
`;

const CartContainer = styled.div`
  grid-area: cart;
  padding-bottom: 30vh;
`;
const SummaryContainer = styled.div`
  grid-area: summary;
  display: flex;
  flex-direction: column;
  border-left: var(--border);
  padding: var(--cell);
  gap: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
`;

function Cart() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const getProduct = useProductFinder(products);
  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);

  const combinedCartItems = [];

  if (cartItems.length !== 0) {
    cartItems.forEach((item) => {
      const existingItem = combinedCartItems.find(
        (i) => i.selectedProductId === item.selectedProductId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        combinedCartItems.push(constructCartItem(item, getProduct));
      }
    });
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
          {combinedCartItems.map((combinedCartItem) => (
            <CartForm
              key={combinedCartItem.id + combinedCartItem.color}
              name={combinedCartItem.name}
              selectedProductId={combinedCartItem.selectedProductId}
              color={combinedCartItem.color}
              quantity={combinedCartItem.quantity}
              unitPrice={combinedCartItem.unitPrice}
              mainImage={combinedCartItem.mainImage}
              combinedCartItem={combinedCartItem}
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
            <StyledLink to='/checkout'>
              <Button $variation='primary'>Proceed to checkout</Button>
            </StyledLink>
          </InfoRow>
        </SummaryContainer>
      </StyledCart>
    </>
  );
}

export default Cart;
