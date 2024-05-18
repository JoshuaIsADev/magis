import styled, { css } from 'styled-components';

const variations = {
  header: css`
    display: flex;
    align-items: left;
    background-color: white;
  `,
  trash: css`
    padding-top: 0.3rem;
  `,
  menu: css`
    display: flex;
    align-items: left;
    border: none;
    text-align: left;
    &:hover,
    &.selected {
      background-color: var(--color-grey-0);
      color: var(--color-grey-900);
    }
  `,

  primary: css`
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: var(--letter-space);
    text-transform: uppercase;
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

  gallery: css`
    width: 4rem;
    height: 1rem;
    border-top: 0.5rem solid var(--color-grey-0);
    border-bottom: 0.5rem solid var(--color-grey-0);
    background-color: var(--color-grey-900);
    &:hover,
    &:active,
    &:active.link {
      background-color: var(--color-grey-200);
    }
  `,
};

const Button = styled.button`
  font-family: var(--font);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: var(--letter-space);
  background-color: var(--color-grey-0);
  border: none;
  text-align: left;
  padding: 0;
  width: fit-content;
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
