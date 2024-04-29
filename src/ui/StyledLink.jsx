import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const variations = {
  productCard: css`
    height: 100%;
  `,
  hero: css`
    color: var(--color-brand);
  `,

  header: css`
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: var(--letter-space);
    text-transform: uppercase;
    color: ${(props) => props.$color};
    transition: 0.5s ease-in;
  `,

  headerLogo: css`
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: var(--letter-space-l);
    text-transform: uppercase;
    color: ${(props) => props.$color};
    transition: 0.5s ease-in;
    &:hover,
    &:active,
    &.active:link {
      text-decoration: none;
    }
  `,

  primaryHeading: css`
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: var(--letter-space);
    text-transform: uppercase;
    padding-left: 1rem;
    color: ${(props) => props.$color};
    transition: 0.1s ease-in;
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 1px;
    &:hover,
    &:active,
    &.active:link {
      color: var(--color-grey-300);
    }
  `,

  footer: css`
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    &:hover,
    &:active,
    &.active:link {
      color: var(--color-grey-600);
    }
  `,

  underline: css`
    font-size: 1rem;
    font-weight: 500;
    text-decoration: underline;
    text-transform: uppercase;
    text-transform: uppercase;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.3rem;
  `,
};

const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-grey-900);
    ${(props) => variations[props.$variation]}
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 1px;
  }
`;

export default StyledLink;
