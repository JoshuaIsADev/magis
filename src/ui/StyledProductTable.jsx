import styled from 'styled-components';

const StyledProductTable = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  padding: var(--padding-l) 0;
`;

export { StyledProductTable };
