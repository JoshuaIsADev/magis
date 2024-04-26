import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import useProductFinder from '../features/products/useProductFinder';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import { capitalize } from '../utils/capitalize';
import Section from '../ui/Section';
import Hr from '../ui/Hr';
import SectionHeading from '../ui/SectionHeading';
import Row from '../ui/Row';
import Column from '../ui/Column';

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 4rem 0rem;
  justify-items: left;
`;

function Orders() {
  const { isPending: isUserPending, user } = useUser();
  const { isPending, orders } = useOrders();

  if (isUserPending || isPending) return <Spinner />;
  const ordersList = orders.filter((order) => order.user_id === user.id);

  const ordersWithParsedProducts = ordersList.map((order) => ({
    ...order,
    orderedProducts: JSON.parse(order.orderedProducts),
  }));
  console.log(ordersWithParsedProducts);

  return (
    <Section>
      <SectionHeading text='Your orders' />
      <Hr />
      {ordersWithParsedProducts.map((order) => (
        <>
          <Row key={order.id}>
            <Column $variation='order'>
              <p>Order number: {order.orderNumber}</p>
              <p>Purchased on: {order.created_at.slice(0, 10)}</p>
              <p>Contact info: {order.email}</p>
              <p>Total price: ${order.totalPrice}</p>
            </Column>
            <div>
              <p>Shipped to:</p>
              <p>{order.fullName}</p>
              <p>{order.streetNumber}</p>
              <p>{order.state}</p>
              <p>{order.zipCode}</p>
            </div>

            {order.orderedProducts.map((orderItem) => (
              <Column $variation='order' key={orderItem.selectedProductId}>
                <p>color: {capitalize(orderItem.color)}</p>
                <p>
                  quanity: {orderItem.quantity} x ${orderItem.unitPrice}
                </p>

                <Img src={orderItem.mainImage} alt='product' />
              </Column>
            ))}
          </Row>
          <Hr />
        </>
      ))}
    </Section>
  );
}

export default Orders;
