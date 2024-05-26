import styled, { css } from 'styled-components';

const variations = {
  manage: css`
    background-color: var(--color-grey-0);
    &:checked {
      background-color: var(--color-grey-900);
      border-color: var(--color-grey-900);
    }
  `,
  order: css`
    width: 3rem;
    text-align: center;
    margin: 0;
    border: none;
    padding: 0.75rem 0;
  `,
  product: css`
    background-color: #${(props) => props.$color};
    &:checked {
      background-color: #${(props) => props.$color};
      outline: 1px solid var(--color-grey-900);
      outline-offset: 4px;
    }
  `,
};

const Input = styled.input`
  border: none;
  border: 1px solid var(--color-grey-900);
  background-color: var(--color-grey-0);
  box-shadow: none;
  border-radius: none;
  padding: 1rem;
  letter-spacing: var(--letter-space);
  width: 100%;
  &[type='radio'] {
    position: relative;
    appearance: none;
    border: 1px solid var(--color-grey-900);
    border-radius: 50%;
    margin-right: 0.35rem;
    cursor: pointer;
    &:checked {
      border-color: var(--color-grey-900);
    }
  }
  ${(props) => variations[props.$variation]}
`;

export default Input;
