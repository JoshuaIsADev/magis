import { useRef, useState } from 'react';
import { VscDebugBreakpointFunction } from 'react-icons/vsc';
import ProductTable from '../features/products/ProductTable';
import CreateProductForm from '../features/products/CreateProductForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import styled from 'styled-components';
import FilterSort from '../ui/FilterSort';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';

const StyledManageProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
  padding-bottom: var(--bottom);
`;

const MenuContainer = styled.div`
  grid-column: 1 / span 5;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
`;

const FilterSortContainer = styled.div`
  grid-column: 1 / span 1;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function ManageProducts() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function toggleModal() {
    setShowForm((show) => !show);
  }

  return (
    <StyledManageProducts>
      <HeadingContainer text='Manage products' />
      <MenuContainer>
        <FilterSortContainer>
          <Button
            $variation='secondary'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Filter / Sort
          </Button>

          <VscDebugBreakpointFunction
            transform={showDropdown ? 'rotate(180)' : 'rotate(0)'}
            className={showDropdown ? 'downArrow' : 'arrow'}
          />
        </FilterSortContainer>
        <Button $variation='secondary' onClick={toggleModal}>
          Add new product
        </Button>
      </MenuContainer>
      <FilterSort showDropdown={showDropdown} />
      <ProductTable />

      {showForm && (
        <Modal onClose={toggleModal} heading='Create a new product'>
          <CreateProductForm onClose={toggleModal} />
        </Modal>
      )}
    </StyledManageProducts>
  );
}

export default ManageProducts;
