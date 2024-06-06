import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import Spinner from '../ui/Spinner';
import OrderCard from '../features/order/OrderCard';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import StyledLink from '../ui/StyledLink.jsx';

const StyledOrders = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  width: 100%;
  padding: 0 var(--padding-body) var(--bottom);
`;

const OrderTable = styled.article`
  grid-column: 1 / span 6;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-bottom: var(--border);
  &:last-child {
    border-bottom: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
`;

const Column = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 800px) {
    grid-column: span 3;
    gap: 0.25rem;
  }
  @media (max-width: 400px) {
    grid-column: span 6;
    gap: 0.25rem;
  }
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
                <Heading as='h2' $variation='bold'>
                  Order details
                </Heading>
                <InfoContainer>
                  <Heading as='h3'>Confirmation number: </Heading>
                  <p>{order.orderNumber}</p>
                  <Heading as='h3'>
                    Purchased on: <p>{order.created_at.slice(0, 10)}</p>
                  </Heading>
                  <Heading as='h3'>Total price: </Heading>
                  <p>${order.totalPrice}</p>
                </InfoContainer>
              </Column>
              <Column>
                <Heading as='h2' $variation='bold'>
                  Contact Info
                </Heading>
                <InfoContainer>
                  <Heading as='h3'>Full Name: </Heading>
                  <p>{order.fullName}</p>
                  <Heading as='h3'>Contact info: </Heading>
                  <p>{order.email}</p>
                </InfoContainer>
              </Column>
              <Column>
                <Heading as='h2' $variation='bold'>
                  Shipped to
                </Heading>
                <InfoContainer>
                  <Heading as='h3'>Name: </Heading>
                  <p>{order.fullName}</p>
                  <Heading as='h3'>Address: </Heading>
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
