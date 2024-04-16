import styled from 'styled-components';

const StyledProductTable = styled.div`
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem; */
  display: grid;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 8rem;
  padding: var(--padding-xl) 0;
`;

export { StyledProductTable };
