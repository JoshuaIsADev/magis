import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import useProductFinder from '../features/products/useProductFinder';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import { capitalize } from '../utils/capitalize';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function Orders() {
  // const { isPending: isProductsPending, products } = useProducts();
  const { isPending: isUserPending, user } = useUser();
  const { isPending, orders } = useOrders();

  if (isUserPending || isPending) return <Spinner />;
  const ordersList = orders.filter((order) => order.user_id === user.id);

  const ordersWithParsedProducts = ordersList.map((order) => ({
    ...order,
    orderedProducts: JSON.parse(order.orderedProducts),
  }));

  return (
    <>
      {ordersWithParsedProducts.map((order) => (
        <div key={order.id}>
          <p>Purchased on: {order.created_at.slice(0, 10)}</p>
          <p>Order number: {order.orderNumber}</p>
          <p>Contact info: {order.email}</p>
          <div>
            <p>Shipped to:</p>
            <p>{order.fullName}</p>
            <p>{order.streetNumber}</p>
            <p>{order.state}</p>
            <p>{order.zipCode}</p>
          </div>

          {order.orderedProducts.map((orderItem) => (
            <div key={orderItem.selectedProductId}>
              <Img src={orderItem.mainImage} alt='product' />
              <p>color: {capitalize(orderItem.color)}</p>
              <p>
                quanity: {orderItem.quantity} x ${orderItem.unitPrice}
              </p>
            </div>
          ))}
          <p>Total price: {order.totalPrice}</p>
        </div>
      ))}
    </>
  );
}

export default Orders;
