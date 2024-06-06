import styled, { css } from 'styled-components';

const variations = {
  productPage: css`
    padding: 2rem;
  `,
  productCard: css`
    aspect-ratio: 1;
    max-width: 30rem;
    max-height: 30rem;
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
