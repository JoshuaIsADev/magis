import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to{
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  margin: auto auto;
  width: 4rem;
  aspect-ratio: 1;
  background-color: var(--color-grey-900);
  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
