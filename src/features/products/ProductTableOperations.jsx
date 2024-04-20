import styled from 'styled-components';
import FilterSort from '../../ui/FilterSort';

const StyledProductTableOperations = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin: 0 auto var(--padding-s);
  /* padding-top: 4rem; */
  /* padding-top: 5rem; */
  /* background-color: white; */
`;

function ProductTableOperations() {
  return (
    <StyledProductTableOperations>
      <FilterSort />
    </StyledProductTableOperations>
  );
}

export default ProductTableOperations;
