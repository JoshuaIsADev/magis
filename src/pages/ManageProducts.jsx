import { useRef, useState } from 'react';
import ProductTable from '../features/products/ProductTable';
import CreateProductForm from '../features/products/CreateProductForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import styled from 'styled-components';
import FilterSort from '../ui/FilterSort';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';

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

const HeadingContainer2 = styled.div`
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

  function toggleModal() {
    setShowForm((show) => !show);
  }

  return (
    <StyledManageProducts>
      <HeadingContainer2>
        <Heading as='h3'>Manage products</Heading>
      </HeadingContainer2>
      <FilterSort />
      <ProductTable />
      <AddButtonContainer>
        <Button $variation='primary' onClick={toggleModal}>
          Add new product
        </Button>
      </AddButtonContainer>

      {showForm && (
        <Modal onClose={toggleModal} heading='Create a new product'>
          <CreateProductForm onClose={toggleModal} />
        </Modal>
      )}
    </StyledManageProducts>
  );
}

export default ManageProducts;
