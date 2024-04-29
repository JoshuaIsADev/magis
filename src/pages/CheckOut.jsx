import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { useProducts } from '../features/products/useProducts';
import styled from 'styled-components';
import CreateOrderForm from '../features/order/CreateOrderForm';
import Spinner from '../ui/Spinner';
import useProductFinder from '../features/products/useProductFinder';
import { constructCartItem } from '../utils/constructCartItem';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Hr from '../ui/Hr';
import Row from '../ui/Row';
import Column from '../ui/Column';
import Heading from '../ui/Heading';
import StyledLink from '../ui/StyledLink';

const Img = styled.img`
  width: 5rem;
  aspect-ratio: 1;
  object-fit: contain;
  /* padding: 4rem 0rem; */
  justify-items: left;
`;

function CheckOut() {
  const { isPending, products } = useProducts();
  const { cartItems, totalPrice } = useContext(CartContext);
  const getProduct = useProductFinder(products);

  const combinedCartItems = [];

  cartItems.forEach((item) => {
    combinedCartItems.push(constructCartItem(item, getProduct));
  });

  // console.log(cartItems);

  if (isPending) return <Spinner />;

  return (
    <Section>
      <SectionHeading text='Your orders' />
      <Hr />
      <Row>
        <Column $variation='sectionHeading'>
          <Heading as='h3' $variation='footer'>
            Need to make some changes?
            <StyledLink $variation='primaryHeading' to='/cart'>
              Back to cart
            </StyledLink>
          </Heading>
        </Column>
      </Row>
      <Row>
        <Column $variation='checkout'>
          <CreateOrderForm />
        </Column>

        <Column $variation='checkoutOrderSummary'>
          {combinedCartItems.map((combinedCartItem) => (
            <Column $variation='order' key={combinedCartItem.id}>
              <Img src={combinedCartItem.mainImage} alt='product' />
              <p>{combinedCartItem.name}</p>
              <p>{combinedCartItem.color}</p>
              <p>{combinedCartItem.quantity}</p>
              <p>
                {Number(combinedCartItem.quantity) *
                  Number(combinedCartItem.unitPrice)}
              </p>
            </Column>
          ))}
        </Column>
      </Row>
      <div>
        <h2>Total price: {totalPrice}</h2>
      </div>
    </Section>
  );
}

export default CheckOut;
