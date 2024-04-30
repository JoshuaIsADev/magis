import { useState } from 'react';
import ProductTable from '../features/products/ProductTable';
import CreateProductForm from '../features/products/CreateProductForm';
import Row from '../ui/Row';
import ProductTableOperations from '../features/products/ProductTableOperations';
import SectionHeading from '../ui/SectionHeading';
import Section from '../ui/Section';
import Hr from '../ui/Hr';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import styled from 'styled-components';
import FilterSort from '../ui/FilterSort';
import Heading from '../ui/Heading';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import Spinner from '../ui/Spinner';
// import { deleteProduct, getProducts } from '../services/apiProducts';
// import { useSearchParams } from 'react-router-dom';

const StyledManageProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'heading heading'
    'addButton menuButton'
    'filterSort filterSort'
    'productTable productTable';
  padding-top: var(--top);
`;

const HeadingContainer = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
  border-left: var(--border);
`;

const AddButtonContainer = styled.div`
  grid-area: addButton;
  padding: var(--cell);
  border-bottom: var(--border);
`;

function ManageProducts() {
  const [showForm, setShowForm] = useState(false);

  const toggleModal = () => {
    setShowForm((show) => !show);
  };

  return (
    <StyledManageProducts>
      <HeadingContainer>
        <Heading as='h3'>Manage products</Heading>
      </HeadingContainer>
      <FilterSort />
      {/* <ProductTableOperations /> */}
      <ProductTable />
      <AddButtonContainer>
        <Button
          $variation='primary'
          onClick={() => setShowForm((show) => !show)}
        >
          Add new product
        </Button>
      </AddButtonContainer>

      {showForm && (
        <Modal onClose={toggleModal} heading='Create a new product'>
          <CreateProductForm />
        </Modal>
      )}
    </StyledManageProducts>
  );
}

export default ManageProducts;
