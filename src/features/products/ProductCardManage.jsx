import { useState } from 'react';
import styled from 'styled-components';
import CreateProductForm from './CreateProductForm';
import { useDeleteProduct } from './UseDeleteProduct';
import { useMainImage } from './useMainImage';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Img from '../../ui/Img';

const StyledProductCard = styled.div`
  grid-column: span 1;
  display: grid;
  grid-template-columns: 1fr 4fr;
  background-color: var(--color-grey-0);
`;

const ImageContainer = styled.div`
  padding: var(--cell);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--cell);
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
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
  console.log(product);

  const mainImage = useMainImage(image)[0];

  function toggleModal() {
    setShowForm((show) => !show);
  }

  return (
    <StyledProductCard>
      <ImageContainer>
        {<Img $variation='productCard' src={mainImage} alt='product' />}
      </ImageContainer>
      <InfoContainer>
        <InfoRow>
          <div>
            <Heading as='h3'>{name}</Heading>
            <p>{designer}</p>
            <p>{category}</p>
          </div>
        </InfoRow>
        <InfoRow>
          <p>${unitPrice}</p>
          <p>{inStock} in stock</p>
          <ButtonContainer>
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
          </ButtonContainer>
        </InfoRow>
      </InfoContainer>

      {showForm && (
        <Modal onClose={toggleModal} heading='Edit product'>
          <CreateProductForm productToEdit={product} />
        </Modal>
      )}
    </StyledProductCard>
  );
}

export default ProductCardManage;
