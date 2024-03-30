import styled from 'styled-components';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

const StyledProductTableOperations = styled.nav`
  padding: 0 var(--padding-s);
`;

function ProductTableOperations() {
  return (
    <StyledProductTableOperations>
      <Filter />
      <SortBy />
    </StyledProductTableOperations>
  );
}

export default ProductTableOperations;
