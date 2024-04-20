import styled, { keyframes } from 'styled-components';

const HeroTextAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const HeroText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: var(--width-max);
  margin: 0 auto;
  opacity: 0;
  animation: ${HeroTextAnimation} 3s ease-in-out forwards;
  animation-delay: 1s;
  transition: opacity 2s ease-in-out;
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: var(--width-max);
  margin: 0 auto;
  padding-top: var(--padding-xl);
`;

export { HeroText, SectionHeading };
