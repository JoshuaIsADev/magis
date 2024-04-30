import { useState } from 'react';
import styled from 'styled-components';
import CreateProductForm from './CreateProductForm';
import { useDeleteProduct } from './UseDeleteProduct';
import { useMainImage } from './useMainImage';
import { VscChromeClose } from 'react-icons/vsc';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Section from '../../ui/Section';
import Row from '../../ui/Row';
import SectionHeading from '../../ui/SectionHeading';
import Hr from '../../ui/Hr';
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

  const mainImage = useMainImage(image)[0];

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
        <Modal>
          <Section>
            <Row>
              <Button onClick={() => setShowForm((show) => !show)}>
                <VscChromeClose />
              </Button>
            </Row>
            <SectionHeading text='Edit product' />
            <CreateProductForm productToEdit={product} />
          </Section>
        </Modal>
      )}
    </StyledProductCard>
  );
}

export default ProductCardManage;
