import styled, { css } from 'styled-components';

const variations = {
  hero: css`
    color: var(--color-brand);
  `,

  header: css`
    color: var(--color-brand);
  `,
  bold: css`
    font-weight: 800;
  `,
  dropdown: css`
    padding-top: 0.6rem;
  `,
};

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 20rem;
      font-weight: 800;
      text-transform: uppercase;
      ${(props) => variations[props.$variation]}
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2.5rem;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: -0.1rem;
      ${(props) => variations[props.$variation]}
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 1rem;
      font-weight: 400;
      line-height: 1rem;
      text-transform: uppercase;
      ${(props) => variations[props.$variation]}
    `}
  ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1rem;
      text-transform: uppercase;
      ${(props) => variations[props.$variation]}
    `}
`;

export default Heading;
