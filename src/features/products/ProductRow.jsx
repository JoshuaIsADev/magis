import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMainImage } from '../../utils/getMainImage';
import CreateProductForm from './CreateProductForm';
import { useDeleteProduct } from './UseDeleteProduct';

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

const TableRow = styled.div``;

function ProductRow({ product }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteProduct } = useDeleteProduct();

  const {
    id: productId,
    name,
    designer,
    category,
    inStock,
    unitPrice,
    image,
  } = product;

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
          <p className='small'>{inStock} in stock</p>
          <p className='small'>${unitPrice}</p>
          <button
            disabled={isDeleting}
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(productId)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateProductForm productToEdit={product} />}
    </>
  );
}

export default ProductRow;
