import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid var(--color-grey-900);
  background-color: var(--color-grey-0);
  box-shadow: none;
  border-radius: none;
  padding: 0.8rem 0;
  margin-bottom: 2rem;
  &[type='radio'] {
    margin-right: 1rem;
  }
`;

export default Input;
