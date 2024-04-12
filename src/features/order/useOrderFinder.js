import { useMemo } from 'react';

function useOrderFinder(orders) {
  const getOrder = useMemo(() => {
    return (order) => {
      return orders.find(order);
    };
  });
}
