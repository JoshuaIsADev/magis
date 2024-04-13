import { useUser } from '../features/authentication/useUser';
import { useOrders } from '../features/order/useOrders';
import useProductFinder from '../features/products/useProductFinder';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import { capitalize } from '../utils/capitalize';
import { constructOrderItem } from '../utils/constructOrderItem';

function Orders() {
  const { isPending: isProductsPending, products } = useProducts();
  const { isPending: isUserPending, user } = useUser();
  const { isPending, orders } = useOrders();
  const getProduct = useProductFinder(products);

  if (isUserPending || isPending) return <Spinner />;
  const ordersList = orders.filter((order) => order.user_id === user.id);

  const ordersWithParsedProducts = ordersList.map((order) => ({
    ...order,
    orderedProducts: JSON.parse(order.orderedProducts),
  }));

  if (ordersWithParsedProducts.length !== 0) {
    const combinedOrderItems = [];

    ordersWithParsedProducts.forEach((item) => {
      combinedOrderItems.push(
        constructOrderItem(item, getProduct, capitalize)
        // item.email
      );
    });
    // console.log(combinedOrderItems);
  }
  // ordersWithParsedProducts.forEach((order) => {
  //   order.orderedProducts.forEach((item) => {
  //     combinedOrderItems.push(
  //       constructOrderItem(item, getProduct, capitalize)
  //     );
  //   });
  // });

  // console.log(combinedOrderItems);
  // console.log(ordersWithParsedProducts);
  // console.log(getProduct(ordersWithParsedProducts[1].orderedProducts[0]));

  return (
    <>
      {/* {ordersWithParsedProducts.map((order) => (
        <div key={order.id}>
          <p>{order.email}</p>
          {order.orderedProducts.map((orderItem) => (
            <div key={orderItem.selectedProductId}>
              <p>{orderItem.selectedProductId}</p>
              <p>{orderItem.quantity}</p>
            </div>
          ))}
        </div>
      ))} */}
    </>
  );
}

export default Orders;
