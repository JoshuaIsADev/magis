import { useState } from 'react';
import styled from 'styled-components';
import CreateProductForm from './CreateProductForm';
import { useDeleteProduct } from './UseDeleteProduct';
import { useMainImage } from './useMainImage';
import Column from '../../ui/Column';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 4rem 0rem;
`;

function ProductCardManage({ product }) {
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

  const mainImage = useMainImage(image)[0];

  return (
    <>
      <Column $variation='productCardManage'>
        <Heading as='h3'>{name}</Heading>
        <p>{designer}</p>
        <p>{category}</p>
        <p>{inStock} in stock</p>
        <p>${unitPrice}</p>
        {<Img src={mainImage} alt='product' />}
        <Column $variation='formSubmitButtons'>
          <Button
            onClick={() => deleteProduct(productId)}
            disabled={isDeleting}
          >
            Delete
          </Button>
          <Button
            $variation='primary'
            disabled={isDeleting}
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </Button>
        </Column>
        {showForm && <CreateProductForm productToEdit={product} />}
      </Column>
    </>
  );
}

export default ProductCardManage;
