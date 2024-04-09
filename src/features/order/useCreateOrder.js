import { useMutation } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '../../services/apiOrders';
import toast from 'react-hot-toast';

export function useCreateOrder() {
  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      toast.success('New order successfully created');
    },
    onError: (err) => toast.error(err.message),
  });
  return { isPending, createOrder };
}
