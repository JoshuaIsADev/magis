import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditProduct } from '../../services/apiProducts';
import toast from 'react-hot-toast';

export function useEditProduct() {
  // console.log(onClose);
  const queryClient = useQueryClient();

  const { mutate: editProduct, isPending: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }) =>
      createEditProduct(newProductData, id),
    onSuccess: () => {
      toast.success('Product successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editProduct };
}
