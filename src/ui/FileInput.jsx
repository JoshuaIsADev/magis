import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  border: 1px solid var(--color-grey-900);
  background-color: var(--color-grey-0);
  border-radius: none;
  padding: 0.8rem 1.2rem;
  box-shadow: none;
  &[type='radio'] {
    margin-right: 1rem;
  }
`;

export default FileInput;
