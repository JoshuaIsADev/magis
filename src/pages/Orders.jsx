import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import Spinner from '../ui/Spinner';

function Orders() {
  const { isPending: isUserPending, user } = useUser();
  const { isPending, orders } = useOrders();

  if (isUserPending || isPending) return <Spinner />;
  const ordersList = orders.filter((order) => order.user_id === user.id);
  console.log(ordersList);

  const ordersWithParsedProducts = ordersList.map((order) => ({
    ...order,
    orderedProducts: JSON.parse(order.orderedProducts),
  }));

  console.log(ordersWithParsedProducts);

  return (
    <>
      {ordersWithParsedProducts.map((order) => (
        <div key={order.id}>
          <p>{order.email}</p>
          {order.orderedProducts.map((orderItem) => (
            <div key={orderItem.i}>
              <p>{orderItem.selectedProductId}</p>
              <p>{orderItem.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Orders;
