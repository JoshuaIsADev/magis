import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { deleteProduct } from '../../services/apiProducts';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

const TableRow = styled.div``;

function ProductRow({ product }) {
  const {
    id: productId,
    name,
    designer,
    category,
    units,
    unitPrice,
    mainImageUrl,
  } = product;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      alert('Product succesfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err) => alert(err.message),
  });

  return (
    <TableRow role='row'>
      <div>{<Img src={mainImageUrl[0]} alt='product' />}</div>
      <div>
        <h3>{name}</h3>
        <p className='small'>{designer}</p>
        <p className='small'>{category}</p>
        <p className='small'>{units} in stock</p>
        <p className='small'>${unitPrice}</p>
        <button>Edit</button>
        <button onClick={() => mutate(productId)} disabled={isDeleting}>
          Delete
        </button>
      </div>
    </TableRow>
  );
}

export default ProductRow;
