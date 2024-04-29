import styled, { css } from 'styled-components';

const variations = {
  full: css`
    background-color: var(--color-grey-0);
    /* border-bottom: 1px solid var(--color-grey-200); */
  `,
  sectionHeading: css`
    padding-top: 10rem;
    background-color: var(--color-grey-0);
  `,
  productCard: css`
    grid-column-gap: 0px;
    grid-gap: 1px;
  `,
  formSubmitButtons: css`
    padding-top: 4rem;
  `,
  // order: css`
  //   align-items: center;
  // `,
};

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  grid-column-gap: 1px;
  background-color: var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-200);
  &::after {
    content: '';
    background-color: var(--color-grey-0);
    grid-column: span 2;
  }
  ${(props) => variations[props.$variation]}
`;

export default Row;
