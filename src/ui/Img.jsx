import styled, { css } from 'styled-components';

const variations = {
  hero: css`
    /* max-height: 80rem; */
    object-fit: cover;
    height: 100%;
  `,
  productCard: css`
    aspect-ratio: 1;
    /* padding: 2rem 0; */
    max-width: 30rem;
    max-height: 30rem;
  `,
  orderCard: css`
    aspect-ratio: 1;
    padding: 2rem 0;
    max-width: 20rem;
    max-height: 20rem;
  `,
  gallery: css`
    height: calc(100vh - 20rem);
    aspect-ratio: 1;
  `,
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${(props) => variations[props.$variation]}
`;

export default Img;
