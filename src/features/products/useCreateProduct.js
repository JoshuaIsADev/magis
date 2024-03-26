import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditProduct } from '../../services/apiProducts';
import toast from 'react-hot-toast';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: (newProduct) => createEditProduct(newProduct),
    onSuccess: () => {
      toast.success('New product successfully created');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProduct };
}
