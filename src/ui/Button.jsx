import styled, { css } from 'styled-components';

const variations = {
  header: css`
    display: flex;
    align-items: left;
    background-color: white;
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
};

const Button = styled.button`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: var(--letter-space);
  text-transform: uppercase;
  padding: 0;
  background-color: var(--color-grey-0);
  border: none;
  text-align: left;
  cursor: pointer;
  &:hover,
  &.selected {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 1px;
  }
  ${(props) => variations[props.$variation]}
`;

export default Button;
