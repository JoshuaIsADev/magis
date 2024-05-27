import { useState } from 'react';
import styled from 'styled-components';
import { VscTrash, VscEdit } from 'react-icons/vsc';
import { useDeleteProduct } from './UseDeleteProduct';
import { useMainImage } from './useMainImage';
import CreateProductForm from './CreateProductForm';
import { Heading, HeadingContainer } from '../../ui/Heading.jsx';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Img from '../../ui/Img';

const StyledProductCard = styled.div`
  grid-column: span 6;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  align-items: center;
  padding: 0 0 2rem 0;
  border-bottom: var(--border);
  &:last-child {
    border-bottom: none;
  }
`;

const RowInfo = styled.div`
  grid-column: 2 / span 4;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--grid-gap);
  align-items: center;
  @media (max-width: 700px) {
    grid-gap: 0;
  }
`;

const InfoContainer = styled.div`
  grid-column: span 1;
  display: flex;
  align-items: center;
  gap: 4rem;
  @media (max-width: 800px) {
    gap: 2rem;
  }
  @media (max-width: 700px) {
    grid-column: span 4;
  }
`;

const ActionContainer = styled.div`
  grid-column: 6 / span 1;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ProductHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  grid-column: 1 / span 1;
  width: 8rem;
  height: 8rem;
  @media (max-width: 800px) {
    width: 4rem;
    height: 4rem;
  }
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

  const mainImage = product?.variants[0]?.variantImage;
  // const mainImage = useMainImage(image)[0];

  function toggleModal() {
    setShowForm((show) => !show);
  }

  return (
    <StyledProductCard>
      {product?.variants[0]?.variantImage ? (
        <ImageContainer>{<Img src={mainImage} alt='product' />}</ImageContainer>
      ) : (
        <InfoContainer>
          <p>Please add a variant</p>
        </InfoContainer>
      )}
      <RowInfo>
        <InfoContainer>
          <ProductHeadingContainer>
            <Heading as='h3'>{name}</Heading>
            <p>{designer}</p>
          </ProductHeadingContainer>
        </InfoContainer>
        <InfoContainer>
          <p>{category}</p>
        </InfoContainer>
        <InfoContainer>
          <p>${unitPrice}</p>
        </InfoContainer>
        <InfoContainer>
          <p>{inStock} in stock</p>
        </InfoContainer>
      </RowInfo>
      <ActionContainer>
        <Button
          $variation='icons'
          disabled={isDeleting}
          onClick={() => deleteProduct(productId)}
        >
          <VscTrash />
        </Button>
        <Button
          $variation='icons'
          disabled={isDeleting}
          onClick={() => setShowForm((show) => !show)}
        >
          <VscEdit />
        </Button>
      </ActionContainer>
      {showForm && (
        <CreateProductForm
          productToEdit={product}
          setShowForm={setShowForm}
          heading='Edit product'
        />
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
