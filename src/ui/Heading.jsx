import styled, { css } from 'styled-components';

const variations = {
  hero: css`
    text-align: justify;
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
  footer: css`
    padding-top: 6rem;
    padding-bottom: 2rem;
  `,
  heading: css`
    padding-top: 6rem;
    padding-bottom: 2rem;
  `,
  filterSort: css`
    padding-bottom: 2rem;
  `,
};

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 14rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: var(--letter-space);
      ${(props) => variations[props.$variation]}
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 6rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: var(--letter-space);
      ${(props) => variations[props.$variation]}
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 1rem;
      font-weight: 700;
      line-height: 1rem;
      letter-spacing: var(--letter-space);
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
      letter-spacing: var(--letter-space);
      ${(props) => variations[props.$variation]}
    `}
`;

export default Heading;
