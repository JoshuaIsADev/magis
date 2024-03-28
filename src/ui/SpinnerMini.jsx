import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to{
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled.div`
  margin: auto auto;
  width: 1rem;
  aspect-ratio: 1;
  background-color: var(--color-grey-900);
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
