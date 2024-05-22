import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import Spinner from '../ui/Spinner';
import OrderCard from '../features/order/OrderCard';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import StyledLink from '../ui/StyledLink.jsx';

const StyledOrders = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
  width: 100%;
  margin-bottom: var(--bottom);
`;

const OrderTable = styled.article`
  grid-column: 1 / span 5;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-bottom: var(--border);
  /* margin-bottom: 2rem; */
  &:last-child {
    border-bottom: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
`;

const Column = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Orders() {
  const { isPending: isUserPending, user } = useUser();
  const { isPending, orders } = useOrders();

  if (user) {
    if (isUserPending || isPending) return <Spinner />;
    const ordersList = orders.filter((order) => order.user_id === user.id);

    const ordersWithParsedProducts = ordersList.map((order) => ({
      ...order,
      orderedProducts: JSON.parse(order.orderedProducts),
    }));

    return (
      <StyledOrders>
        <HeadingContainer text='Your orders' />
        {ordersWithParsedProducts.map((order) => (
          <OrderTable key={order.id}>
            <Row>
              <Column>
                <Heading as='h3'>Order details</Heading>
                <InfoContainer>
                  <p>Confirmation number: {order.orderNumber}</p>
                  <p>Purchased on: {order.created_at.slice(0, 10)}</p>
                  <p>Total price: ${order.totalPrice}</p>
                </InfoContainer>
              </Column>
              <Column>
                <Heading as='h3'>Contact Info</Heading>
                <InfoContainer>
                  <p>Full Name: {order.fullName}</p>
                  <p>Contact info: {order.email}</p>
                </InfoContainer>
              </Column>
              <Column>
                <Heading as='h3'>Shipped to</Heading>
                <InfoContainer>
                  <p>{order.fullName}</p>
                  <p>{order.streetNumber}</p>
                  <p>{order.state}</p>
                  <p>{order.zipCode}</p>
                </InfoContainer>
              </Column>
            </Row>
            <Row>
              {order.orderedProducts.map((orderItem) => (
                <OrderCard
                  key={orderItem.selectedVariantId}
                  orderItem={orderItem}
                />
              ))}
            </Row>
          </OrderTable>
        ))}
      </StyledOrders>
    );
  } else {
    return (
      <StyledOrders>
        <HeadingContainer text='Your orders' />
        <Column>
          <Heading as='h3' $variation='danger'>
            Please{' '}
            <StyledLink $variation='secondary' to='/signin'>
              Sign in
            </StyledLink>{' '}
            to view your orders.
          </Heading>
        </Column>
      </StyledOrders>
    );
  }
}

export default Orders;
