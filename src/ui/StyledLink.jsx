import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const variations = {
  header: css`
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: var(--letter-space);
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 1px;
    color: ${(props) => props.$color};
  `,

  headerLogo: css`
    font-size: 1rem;
    font-weight: 700;
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

  secondary: css`
    border: none;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: underline;
    text-transform: uppercase;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.3rem;
    padding-left: 0.5rem;
    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.3rem;
      text-decoration-thickness: 2px;
    }
  `,
  underline: css`
    font-size: 1rem;
    font-weight: 500;
    text-decoration: underline;
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
    text-decoration-thickness: 2px;
  }
`;

export default StyledLink;
