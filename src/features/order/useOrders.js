import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../services/apiOrders';

export function useOrders() {
  const {
    isPending,
    data: orders,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
  return { isPending, error, orders };
}
