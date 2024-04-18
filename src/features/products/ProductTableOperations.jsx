import styled from 'styled-components';
import FilterSort from '../../ui/FilterSort';

const StyledProductTableOperations = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin: var(--padding-l) auto;
  padding-top: 4rem;
`;

function ProductTableOperations() {
  return (
    <StyledProductTableOperations>
      <FilterSort />
    </StyledProductTableOperations>
  );
}

export default ProductTableOperations;
