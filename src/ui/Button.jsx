import styled, { css } from 'styled-components';

const variations = {
  primary: css`
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: var(--letter-space);
    text-transform: uppercase;
    padding: 0.5rem 0.5rem 0.35rem;
    border: 1px solid var(--color-grey-900);
    border-radius: none;
    color: ${(props) => props.$color};
    color: var(--color-grey-900);
    background-color: var(--color-grey-0);
    transition: 0.1s ease-in;
    text-decoration: none;
    text-underline-offset: 0;
    text-decoration-thickness: 0;
    &:hover,
    &:active,
    &.active:link {
      color: var(--color-grey-0);
      background-color: var(--color-grey-900);
      text-decoration: none;
      text-underline-offset: 0;
      text-decoration-thickness: 0;
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
    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.3rem;
      text-decoration-thickness: 2px;
    }
  `,
};

const Button = styled.button`
  font-family: var(--font);
  font-size: 1rem;
  font-weight: 500;
  background-color: var(--color-grey-0);
  border: none;
  text-align: left;
  padding: 0;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  &:hover,
  &.selected {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 2px;
  }
  ${(props) => variations[props.$variation]}
`;

export default Button;
