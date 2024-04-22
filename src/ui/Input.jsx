import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-grey-0);
  background-color: var(--color-grey-900);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: none;
  &[type='radio'] {
    margin-right: 1rem;
  }
`;

export default Input;
