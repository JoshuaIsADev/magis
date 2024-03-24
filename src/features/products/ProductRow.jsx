import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { deleteProduct } from '../../services/apiProducts';
import toast from 'react-hot-toast';
import { getMainImage } from '../../utils/getMainImage';
import { useEffect, useState } from 'react';
import CreateProductForm from './CreateProductForm';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

const TableRow = styled.div``;

function ProductRow({ product }) {
  const [showForm, setShowForm] = useState(false);

  const {
    id: productId,
    name,
    designer,
    category,
    units,
    unitPrice,
    image,
  } = product;

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      toast.success('Product succesfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    getMainImage(image).then((image) => {
      setMainImage(image[0]);
    });
  }, [image]);

  return (
    <>
      <TableRow role='row'>
        <div>{<Img src={mainImage} alt='product' />}</div>
        <div>
          <h3>{name}</h3>
          <p className='small'>{designer}</p>
          <p className='small'>{category}</p>
          <p className='small'>{units} in stock</p>
          <p className='small'>${unitPrice}</p>
          <button
            disabled={isDeleting}
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </button>
          <button onClick={() => mutate(productId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateProductForm productToEdit={product} />}
    </>
  );
}

export default ProductRow;
