import styled, { css } from 'styled-components';

const variations = {
  order: css`
    text-align: center;
  `,
};

const Input = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-grey-900);
  background-color: var(--color-grey-0);
  box-shadow: none;
  border-radius: none;
  padding: 0.5rem 0;
  &[type='radio'] {
    margin-right: 1rem;
  }
  ${(props) => variations[props.$variation]}
`;

export default Input;
