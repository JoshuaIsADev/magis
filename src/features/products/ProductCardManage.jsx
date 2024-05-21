import { useState } from 'react';
import styled from 'styled-components';
import { VscTrash } from 'react-icons/vsc';
import { useDeleteProduct } from './UseDeleteProduct';
import { useMainImage } from './useMainImage';
import CreateProductForm from './CreateProductForm';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Img from '../../ui/Img';

const StyledProductCard = styled.div`
  grid-column: span 5;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
  align-items: center;
  background-color: var(--color-grey-0);
  padding: 0 0 2rem 0;
  border-bottom: var(--border);
  &:last-child {
    border-bottom: none;
  }
`;

const ColumnInfo = styled.div`
  grid-column: span 1;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  grid-column: 1 / span 1;
  width: 8rem;
  height: 8rem;
`;

function ProductCardManage({ product }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteProduct } = useDeleteProduct();
  // console.log(product);

  const {
    id: productId,
    name,
    designer,
    category,
    inStock,
    unitPrice,
    image,
  } = product;

  // const mainImage = product.variants[0].variantImage;
  const mainImage = useMainImage(image)[0];

  function toggleModal() {
    setShowForm((show) => !show);
  }

  return (
    <StyledProductCard>
      <ColumnInfo>
        <ImageContainer>{<Img src={mainImage} alt='product' />}</ImageContainer>
      </ColumnInfo>
      <ColumnInfo>
        <AboutContainer>
          <Heading as='h3'>{name}</Heading>
          <p>{category}</p>
          <p>{designer}</p>
        </AboutContainer>
      </ColumnInfo>
      <ColumnInfo>
        <p>${unitPrice}</p>
      </ColumnInfo>
      <ColumnInfo>
        <p>{inStock} in stock</p>
      </ColumnInfo>
      <ColumnInfo>
        <Button onClick={() => deleteProduct(productId)} disabled={isDeleting}>
          <VscTrash />
        </Button>
        <Button
          $variation='primary'
          disabled={isDeleting}
          onClick={() => setShowForm((show) => !show)}
        >
          Edit
        </Button>
      </ColumnInfo>
      {showForm && (
        <CreateProductForm productToEdit={product} setShowForm={setShowForm} />
      )}
      {/* {showForm && (
        <Modal onClose={toggleModal} heading='Edit product'>
          <CreateProductForm productToEdit={product} />
        </Modal>
      )} */}
    </StyledProductCard>
  );
}

export default ProductCardManage;
