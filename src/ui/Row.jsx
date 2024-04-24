import styled, { css } from 'styled-components';

const variations = {
  sectionHeading: css`
    padding-top: 10rem;
  `,
  formSubmitButtons: css`
    padding-top: 4rem;
  `,
};

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 2rem;
  padding: 1rem 2rem;
  ${(props) => variations[props.$variation]}
`;

export default Row;
