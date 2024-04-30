import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import styled from 'styled-components';
import CreateOrderForm from '../features/order/CreateOrderForm';
import Spinner from '../ui/Spinner';
import useProductFinder from '../features/products/useProductFinder';
import { constructCartItem } from '../utils/constructCartItem';
import Heading from '../ui/Heading';
import Img from '../ui/Img';
import Button from '../ui/Button';

const StyledCheckOut = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    ' cartHeading summaryHeading'
    'cart shipping';
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
  padding-top: var(--top);
`;

const CartContainer = styled.div`
  grid-area: cart;
`;
const ShippingContainer = styled.div`
  grid-area: shipping;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-bottom: var(--border);
`;

const TotalContainer = styled.div`
  margin: 5rem 0 10rem;
  padding: var(--cell);
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

const HeadingContainer = styled.div`
  grid-area: cartHeading;
  padding: var(--cell);
  border-left: var(--border);
  border-bottom: var(--border);
`;

const ShippingHeadingContainer = styled.div`
  grid-area: summaryHeading;
  padding: var(--cell);
  border-left: var(--border);
  border-bottom: var(--border);
`;

function CheckOut() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const getProduct = useProductFinder(products);

  const taxes = (Number(totalPrice) * 0.08).toFixed(2);
  const finalTotalPrice = (Number(totalPrice) + Number(taxes)).toFixed(2);

  const combinedCartItems = [];

  cartItems.forEach((item) => {
    combinedCartItems.push(constructCartItem(item, getProduct));
  });

  // console.log(cartItems);

  if (isPending) return <Spinner />;

  return (
    <StyledCheckOut>
      <HeadingContainer>
        <Heading as='h3'>Order summary</Heading>
      </HeadingContainer>
      <ShippingHeadingContainer>
        <Heading as='h3'>Shipping details</Heading>
      </ShippingHeadingContainer>
      <CartContainer>
        {combinedCartItems.map((combinedCartItem) => (
          <CartCard key={combinedCartItem.id}>
            <ImageContainer>
              <Img
                $variation='orderCard'
                src={combinedCartItem.mainImage}
                alt='product'
              />
            </ImageContainer>
            <InfoContainer>
              <InfoRow>
                <Heading as='h3'>{combinedCartItem.name}</Heading>
                <p>
                  {Number(combinedCartItem.quantity) *
                    Number(combinedCartItem.unitPrice)}
                </p>
              </InfoRow>
              <InfoRow>
                <p>{combinedCartItem.color}</p>
                <p>{combinedCartItem.quantity}x</p>
              </InfoRow>
            </InfoContainer>
          </CartCard>
        ))}
        <TotalContainer>
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
        </TotalContainer>
      </CartContainer>
      {/* <Row>
        <Column $variation='sectionHeading'>
          <Heading as='h3' $variation='footer'>
            Need to make some changes?
            <StyledLink $variation='primaryHeading' to='/cart'>
              Back to cart
            </StyledLink>
          </Heading>
        </Column>
      </Row> */}
      <ShippingContainer>
        <CreateOrderForm />
      </ShippingContainer>
    </StyledCheckOut>
  );
}

export default CheckOut;
