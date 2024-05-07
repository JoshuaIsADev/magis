import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import Spinner from '../ui/Spinner';
import OrderCard from '../features/order/OrderCard';
import Heading from '../ui/Heading';

const StyledOrders = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-areas: 'heading' 'orders';
  padding-top: var(--top);
`;

const HeadingContainer = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
  border-left: var(--border);
  border-right: var(--border);
`;

const OrderTable = styled.div`
  grid-area: orders;
  border-left: var(--border);
  border-right: var(--border);

  grid-gap: 1px;
  background-color: var(--color-grey-200);
  &::after {
    content: '';
    background-color: var(--color-grey-0);
    grid-column: span 1;
  }
`;

const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'info item';
  border-bottom: var(--border);
`;

const OrderInfoContainer = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  padding: var(--cell);
  background-color: var(--color-grey-0);
  gap: 2rem;
`;
const OrderCardContainer = styled.div`
  grid-area: item;
  background-color: var(--color-grey-0);
  border-left: var(--border);
`;

function Orders() {
  const { isPending: isUserPending, user } = useUser();
  const { isPending, orders } = useOrders();

  if (isUserPending || isPending) return <Spinner />;
  const ordersList = orders.filter((order) => order.user_id === user.id);
  console.log(orders);

  const ordersWithParsedProducts = ordersList.map((order) => ({
    ...order,
    orderedProducts: JSON.parse(order.orderedProducts),
  }));

  return (
    <StyledOrders>
      <HeadingContainer>
        <Heading as='h3'>Your orders</Heading>
      </HeadingContainer>
      <OrderTable>
        {ordersWithParsedProducts.map((order) => (
          <OrderContainer key={order.id}>
            <OrderInfoContainer>
              <div>
                <Heading as='h3'>Order details</Heading>
                <p>Confirmation number: {order.orderNumber}</p>
                <p>Purchased on: {order.created_at.slice(0, 10)}</p>
                <p>Contact info: {order.email}</p>
                <p>Total price: ${order.totalPrice}</p>
              </div>
              <div>
                <Heading as='h3'>Shipped to</Heading>
                <p>{order.fullName}</p>
                <p>{order.streetNumber}</p>
                <p>{order.state}</p>
                <p>{order.zipCode}</p>
              </div>
            </OrderInfoContainer>

            <OrderCardContainer>
              {order.orderedProducts.map((orderItem) => (
                <OrderCard
                  key={orderItem.selectedVariantId}
                  orderItem={orderItem}
                />
              ))}
            </OrderCardContainer>
          </OrderContainer>
        ))}
      </OrderTable>
    </StyledOrders>
  );
}

export default Orders;
