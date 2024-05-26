import styled, { css } from 'styled-components';
import ProductPage from '../pages/ProductPage';

const variations = {
  hero: css`
    /* max-height: 80rem; */
    object-fit: cover;
    height: 100%;
  `,
  productPage: css`
    padding: 2rem;
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
  xs: css`
    aspect-ratio: 1;
    width: 12rem;
  `,
  xxs: css`
    aspect-ratio: 1;
    width: 3rem;
  `,
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  ${(props) => variations[props.$variation]}
`;

export default Img;
