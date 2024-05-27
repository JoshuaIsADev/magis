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
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body) var(--bottom);
`;

const MenuContainer = styled.div`
  grid-column: 1 / span 6;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
`;

const ColumnMenu = styled.div`
  grid-column: span 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 1200px) {
    grid-column: span 2;
  }
  @media (max-width: 600px) {
    grid-column: span 3;
  }
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
        <ColumnMenu>
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
        </ColumnMenu>
        <ColumnMenu>
          <Button $variation='primary' onClick={toggleModal}>
            Add new product
          </Button>
        </ColumnMenu>
      </MenuContainer>
      {showForm && (
        <CreateProductForm
          setShowForm={setShowForm}
          heading='Create a new product'
        />
      )}
      <FilterSort showDropdown={showDropdown} />
      <ProductTable />
    </StyledManageProducts>
  );
}

export default ManageProducts;
