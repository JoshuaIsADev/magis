import styled, { css } from 'styled-components';

const variations = {
  header: css`
    display: flex;
    align-items: center;
    background-color: white;
  `,
  menu: css`
    display: flex;
    align-items: center;
    border: none;
    &:hover,
    &.selected {
      background-color: var(--color-grey-0);
      color: var(--color-grey-900);
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
  cursor: pointer;
  &:hover,
  &.selected {
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    text-decoration-thickness: 2px;
  }
  ${(props) => variations[props.$variation]}
`;

export default Button;
