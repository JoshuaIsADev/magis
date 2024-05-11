import styled, { css } from 'styled-components';

const variations = {
  manage: css`
    background-color: var(--color-grey-0);
    &:checked {
      background-color: var(--color-grey-900);
      border-color: var(--color-grey-200);
    }
  `,
  order: css`
    text-align: center;
    margin: 0;
    width: 2rem;
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
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  box-shadow: none;
  border-radius: none;
  padding: 0.5rem 0;
  letter-spacing: var(--letter-space);
  &[type='radio'] {
    position: relative;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid var(--color-grey-200);
    border-radius: 50%;
    /* background-color: var(--color-grey-0); */

    margin-right: 0.5rem;
    cursor: pointer;

    &:checked {
      /* background-color: var(--color-grey-900); */
      border-color: var(--color-grey-200);
    }
  }
  ${(props) => variations[props.$variation]}
`;

export default Input;
